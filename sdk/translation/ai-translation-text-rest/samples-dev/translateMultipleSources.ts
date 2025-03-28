// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get translation for a multiple text fields and each input text
 * is in different language.
 */
import type { TranslatorCredential, InputTextItem } from "@azure-rest/ai-translation-text";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import "dotenv/config";

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main(): Promise<void> {
  console.log("== Multiple input texts ==");

  const translateCedential: TranslatorCredential = {
    key: apiKey,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [
    { text: "This is a test." },
    { text: "Esto es una prueba." },
    { text: "Dies ist ein Test." },
  ];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
    },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body;
  for (const translation of translations) {
    console.log(
      `Detected languages of the input text: ${translation?.detectedLanguage?.language} with score: ${translation?.detectedLanguage?.score}.`,
    );
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
