import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function postUser(req,res){
    try {
        // Extract user data from request body
        const { email, name } = req.body;
    
        // Create a new user in the database using Prisma Client
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
          },
        });
    
        // Send a success response with the newly created user
        res.status(201).json(newUser);
      } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default postUser;