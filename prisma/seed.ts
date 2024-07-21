import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { parse } from "date-fns";

const prisma = new PrismaClient();

async function main() {
    // Create 5 users
    const userPromises = [];
    for (let i = 0; i < 5; i++) {
        userPromises.push(
            prisma.user.create({
                data: {
                    email: faker.internet.email(),
                    name: `User ${i + 1}`,
                    password: faker.internet.password(), // Ensure this field exists in your schema
                },
            })
        );
    }
    const createdUsers = await Promise.all(userPromises);

    // Create 5 organizers for each user
    const organizerPromises = [];
    for (const user of createdUsers) {
        organizerPromises.push(
            prisma.organiser.create({
                data: {
                    name: `Organizer for ${user.name}`,
                    userID: user.id,
                },
            })
        );
    }
    const createdOrganizers = await Promise.all(organizerPromises);

    // Define event types
    const eventTypes = ['A', 'B', 'C', 'D', 'E'];

    // Create 5 events for each organizer
    for (const organizer of createdOrganizers) {
        const eventPromises = [];
        for (let i = 0; i < 5; i++) {
            const inputDate = `17/06/2024`;
            const parsedDate = parse(inputDate, 'dd/MM/yyyy', new Date());
            parsedDate.setHours(0, 0, 0, 0);

            eventPromises.push(
                prisma.event.create({
                    data: {
                        title: faker.lorem.sentence(),
                        description: faker.lorem.paragraph(),
                        type: eventTypes[i],
                        date: parsedDate,
                        organiserID: organizer.id, // Ensure this field exists in your schema
                    },
                })
            );
        }
        await Promise.all(eventPromises);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
