// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import Long from "long";
import { TestClientType, TestMessage } from "./utils/testUtils.js";
import type { ServiceBusClientForTests } from "./utils/testutils2.js";
import { createServiceBusClientForTests } from "./utils/testutils2.js";
import type { ServiceBusSender } from "../../src/index.js";
import type { ServiceBusSessionReceiver } from "../../src/index.js";
import { ServiceBusClient } from "../../src/index.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { assert, should } from "./utils/chai.js";

describe("invalid parameters", () => {
  let serviceBusClient: ServiceBusClientForTests;

  beforeAll(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  afterAll(() => {
    return serviceBusClient.test.after();
  });

  const invalidMessageCounts = [-100, 0, "boo", undefined, null];

  describe("Invalid parameters in SessionReceiver", function (): void {
    let sender: ServiceBusSender;
    let receiver: ServiceBusSessionReceiver;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    beforeAll(async () => {
      const entityNames = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedQueueWithSessions,
      );

      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityNames.queue!),
      );

      receiver = await serviceBusClient.test.acceptSessionWithPeekLock(
        entityNames,
        TestMessage.sessionId,
      );

      await sender.sendMessages(TestMessage.getSessionSample());
    });

    afterAll(() => {
      return serviceBusClient.test.afterEach();
    });

    it("SessionReceiver: Throws error if created a client with invalid receiveMode", async function (): Promise<void> {
      let errorCaught: string = "";
      try {
        const { queue } = serviceBusClient.test.getTestEntities(
          TestClientType.PartitionedQueueWithSessions,
        );

        await serviceBusClient.acceptSession(queue!, TestMessage.sessionId, {
          receiveMode: 123 as any,
        });
      } catch (error: any) {
        errorCaught = error.message;
      }
      expect(
        errorCaught,
        "Did not throw error if created a client with invalid receiveMode.",
      ).includes(
        `Invalid receiveMode '123' provided. Valid values are 'peekLock' and 'receiveAndDelete'`,
      );
    });

    invalidMessageCounts.forEach((inputValue) => {
      it(`ReceiveMessages: ${inputValue} as maxMessageCount in SessionReceiver`, async function (): Promise<void> {
        try {
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          await receiver.receiveMessages(inputValue);
          assert.fail("This should not have passed.");
        } catch (error: any) {
          should.equal(error && error.name, "TypeError");
          expect(error.message, "Validation error for maxMessageCount not thrown").includes(
            "maxMessageCount",
          );
        }
      });
    });

    invalidMessageCounts.forEach((inputValue) => {
      it(`Peek: ${inputValue} as maxMessageCount in SessionReceiver`, async function (): Promise<void> {
        try {
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          await receiver.peekMessages(inputValue);
          assert.fail("This should not have passed.");
        } catch (error: any) {
          should.equal(error && error.name, "TypeError");
          expect(error.message, "Validation error for maxMessageCount not thrown").includes(
            "maxMessageCount",
          );
        }
      });
    });

    invalidMessageCounts.forEach((inputValue) => {
      it(`PeekBySequenceNumber: ${inputValue} maxMessageCount in SessionReceiver`, async function (): Promise<void> {
        try {
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          await receiver.peekMessages(inputValue, {
            fromSequenceNumber: Long.ZERO,
          });
          assert.fail("This should not have passed.");
        } catch (error: any) {
          should.equal(error && error.name, "TypeError");
          expect(error.message, "Validation error for maxMessageCount not thrown").includes(
            "maxMessageCount",
          );
        }
      });
    });

    it("PeekBySequenceNumber: Wrong type fromSequenceNumber in SessionReceiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.peekMessages(1, { fromSequenceNumber: "somestring" as any });
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "fromSequenceNumber" should be of type "Long"`,
      );
    });

    [false, 0, -0, "", NaN].forEach((falsyValue) => {
      it("PeekBySequenceNumber: Wrong type fromSequenceNumber in SessionReceiver when passing falsy value that is not undefined or null", async function (): Promise<void> {
        let caughtError: Error | undefined;
        try {
          await receiver.peekMessages(1, { fromSequenceNumber: falsyValue as any });
        } catch (error: any) {
          caughtError = error;
        }
        should.equal(caughtError?.name, "TypeError");
        expect(caughtError?.message).includes(
          `The parameter "fromSequenceNumber" should be of type "Long"`,
        );
      });
    });

    it("RegisterMessageHandler: Missing onMessage in SessionReceiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        receiver.subscribe(undefined as any, undefined as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Invalid "MessageHandlers" provided.`);
    });

    it("RegisterMessageHandler: Wrong type for onMessage in SessionReceiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        receiver.subscribe("somestring" as any, "somethingelse" as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Invalid "MessageHandlers" provided.`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumbers in SessionReceiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages("somestring" as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      console.log(caughtError?.message);
      expect(caughtError?.message).includes(
        `The parameter "sequenceNumbers" should be of type "Long"`,
      );
    });

    it("ReceiveDeferredMessages: Missing sequenceNumber in SessionReceiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(undefined as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Missing parameter "sequenceNumbers"`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber array in SessionReceiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(["somestring"] as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "sequenceNumbers" should be an array of type "Long"`,
      );
    });
  });

  describe("Invalid parameters in Receiver", function (): void {
    const mockConnectionString =
      "Endpoint=sb://test/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=test";
    const sbClient = new ServiceBusClient(mockConnectionString);
    const receiver = sbClient.createReceiver("dummyQueue");

    it("Receiver: Invalid ReceiveMode", async function (): Promise<void> {
      let errorCaught: string = "";
      try {
        // @ts-expect-error We are trying invalid values on purpose to test the error thrown
        sbClient.createReceiver("dummyQueue", { receiveMode: 123 });
      } catch (error: any) {
        errorCaught = error.message;
      }
      expect(
        errorCaught,
        "Did not throw error if created a client with invalid receiveMode.",
      ).includes(
        `Invalid receiveMode '123' provided. Valid values are 'peekLock' and 'receiveAndDelete'`,
      );
    });

    it("Receiver: Invalid SubQueue", async function (): Promise<void> {
      let errorCaught: string = "";
      try {
        // @ts-expect-error We are trying invalid values on purpose to test the error thrown
        sbClient.createReceiver("dummyQueue", { subQueueType: 123 });
      } catch (error: any) {
        errorCaught = error.message;
      }
      expect(
        errorCaught,
        "Did not throw error if created a client with invalid subQueue.",
      ).includes(
        `Invalid subQueueType '123' provided. Valid values are 'deadLetter' and 'transferDeadLetter'`,
      );
    });

    invalidMessageCounts.forEach((inputValue) => {
      it(`ReceiveMessages: ${inputValue} as maxMessageCount in Receiver`, async function (): Promise<void> {
        try {
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          await receiver.receiveMessages(inputValue);
          assert.fail("This should not have passed.");
        } catch (error: any) {
          should.equal(error && error.name, "TypeError");
          expect(error.message, "Validation error for maxMessageCount not thrown").includes(
            "maxMessageCount",
          );
        }
      });
    });

    invalidMessageCounts.forEach((inputValue) => {
      it(`Peek: ${inputValue} as maxMessageCount in Receiver`, async function (): Promise<void> {
        try {
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          await receiver.peekMessages(inputValue);
          assert.fail("This should not have passed.");
        } catch (error: any) {
          should.equal(error && error.name, "TypeError");
          expect(error.message, "Validation error for maxMessageCount not thrown").includes(
            "maxMessageCount",
          );
        }
      });
    });

    invalidMessageCounts.forEach((inputValue) => {
      it(`PeekBySequenceNumber: ${inputValue} maxMessageCount in Receiver`, async function (): Promise<void> {
        try {
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          await receiver.peekMessages(inputValue, {
            fromSequenceNumber: Long.ZERO,
          });
          assert.fail("This should not have passed.");
        } catch (error: any) {
          should.equal(error && error.name, "TypeError");
          expect(error.message, "Validation error for maxMessageCount not thrown").includes(
            "maxMessageCount",
          );
        }
      });
    });

    it("PeekBySequenceNumber: Wrong type fromSequenceNumber for Queue", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.peekMessages(1, { fromSequenceNumber: "somestring" as any });
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "fromSequenceNumber" should be of type "Long"`,
      );
    });

    [false, 0, -0, "", NaN].forEach((falsyValue) => {
      it("PeekBySequenceNumber: Wrong type fromSequenceNumber for Queue when passing falsy value that is not undefined or null", async function (): Promise<void> {
        let caughtError: Error | undefined;
        try {
          await receiver.peekMessages(1, { fromSequenceNumber: falsyValue as any });
        } catch (error: any) {
          caughtError = error;
        }
        should.equal(caughtError?.name, "TypeError");
        expect(caughtError?.message).includes(
          `The parameter "fromSequenceNumber" should be of type "Long"`,
        );
      });
    });

    it("RegisterMessageHandler: Missing onMessage in Receiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        receiver.subscribe(undefined as any, undefined as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Invalid "MessageHandlers" provided.`);
    });

    it("RegisterMessageHandler: Wrong type for onMessage in Receiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        receiver.subscribe("somestring" as any, "somethingelse" as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Invalid "MessageHandlers" provided.`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber in Receiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages("somestring" as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "sequenceNumbers" should be of type "Long"`,
      );
    });

    it("ReceiveDeferredMessages: Missing sequenceNumber in Receiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(undefined as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Missing parameter "sequenceNumbers"`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber array in Receiver", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(["somestring"] as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "sequenceNumbers" should be an array of type "Long"`,
      );
    });
  });

  describe("Invalid parameters in Sender", function (): void {
    const mockConnectionString =
      "Endpoint=sb://test/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=test";
    const sbClient = new ServiceBusClient(mockConnectionString);
    const sender = sbClient.createSender("dummyQueue");

    it("ScheduledMessages: Missing date in Sender", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.scheduleMessages(undefined as any, undefined as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Missing parameter "scheduledEnqueueTimeUtc"`);
    });

    it("ScheduledMessages: Missing messages in Sender", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.scheduleMessages(undefined as any, new Date());
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Missing parameter "messages"`);
    });

    it("CancelScheduledMessages: Wrong type sequenceNumber in Sender", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessages("somestring" as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "sequenceNumbers" should be of type "Long"`,
      );
    });

    it("CancelScheduledMessages: Missing sequenceNumbers in Sender", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessages(undefined as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(`Missing parameter "sequenceNumbers"`);
    });

    it("CancelScheduledMessages: Wrong type sequenceNumbers array in Sender", async function (): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessages(["somestring"] as any);
      } catch (error: any) {
        caughtError = error;
      }
      should.equal(caughtError?.name, "TypeError");
      expect(caughtError?.message).includes(
        `The parameter "sequenceNumbers" should be an array of type "Long"`,
      );
    });
  });
});
