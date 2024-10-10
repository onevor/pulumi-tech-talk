export async function handler(event: any, ctx: any) {
  console.log('Hello world', JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ message: 'Woop Woop' }),
  };
}
