// api/postMessage.js
export async function postMessage(prompt) {
    try {
      const res = await fetch('/api/forwardMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
  