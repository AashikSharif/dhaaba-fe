import './global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Root from '~/Root';

// Create a Query Client
const queryClient = new QueryClient();

export default function App() {
  // const f = () => {
  //   axios
  //     .post(
  //       'https://api.cloudflare.com/client/v4/accounts/a41c307ccbbda2088dfa01260a21bd83/ai/run/@cf/meta/llama-3-8b-instruct',
  //       {
  //         messages: [
  //           {
  //             role: 'system',
  //             content:
  //               'You are a polite and helpful assistant. Your job is to create an amazing fusion of two different types of cuisines from around the world into a single recipe. Keep the recipe simple and keep the ingredient list concise, no need to provide separate ingredient list for each part of the recipe. Incorporate the different flavor profiles and spices of the given cuisines. Be sure to follow the diet constraints if mentioned. Your output should contain a concise ingredient list and the recipe.',
  //           },
  //           {
  //             role: 'user',
  //             content: 'I want a main course for 1 person mixing influences from Italy and Jamaica',
  //           },
  //         ],
  //         max_tokens: 500,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer sVDsrXpaBNvDePOosv25i1tYr-nXje2fM2632bZb`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log('Response:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error.message);
  //     });
  // };

  // async function run(model, input) {
  //   const response = await fetch(
  //     `https://api.cloudflare.com/client/v4/accounts/a41c307ccbbda2088dfa01260a21bd83/ai/run/${model}`,
  //     {
  //       headers: { Authorization: `Bearer ${'sVDsrXpaBNvDePOosv25i1tYr-nXje2fM2632bZb'}` },
  //       method: 'POST',
  //       body: JSON.stringify(input),
  //     }
  //   );
  //   const result = await response.json();
  //   return result;
  // }
  //
  // useEffect(() => {
  //   run('@cf/meta/llama-3-8b-instruct', {
  //     messages: [
  //       {
  //         role: 'system',
  //         content:
  //           'You are a polite and helpful assitant. Your job is to create an amazing fusion of two different types of cuisines from around the world into a single recipe. Keep the recipe simple and keep the ingredient list concise, no need to provide separate ingredient list for each part of the recipe. Incorporate the different flavor profiles and spices of the given cousines. Be sure to follow the diet constraints if mentioned. Your output should contain a concise ingredient list and the recipe.',
  //       },
  //
  //       {
  //         role: 'user',
  //         content: 'I want a main course for 1 person mixing influences from Italy and Jamaica',
  //       },
  //     ],
  //   }).then((response) => {
  //     console.log(JSON.stringify(response));
  //   });
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider edges={['right', 'left']}>
        <StatusBar hidden />
        <Root />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
