import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email } = req.body;

      // Here you would typically:
      // 1. Validate the input
      // 2. Check if the user already exists
      // 3. Hash the password (if you're collecting one)
      // 4. Store the user in your database

      // For this example, we'll just log the data and return a success message
      console.log('New user:', { firstName, lastName, email });

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
