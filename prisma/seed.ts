import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { parse, addDays, format } from "date-fns";

const prisma = new PrismaClient();

// Function to generate a random date within a specified range
function getRandomDate(start: Date, end: Date): Date {
    const dateRange = end.getTime() - start.getTime();
    const randomTime = Math.random() * dateRange + start.getTime();
    return new Date(randomTime);
}

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

    // Define date range for random dates
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date(2024, 11, 31); // December 31, 2024

    // Create 5 events for each organizer with random dates
    for (const organizer of createdOrganizers) {
        const eventPromises = [];
        for (let i = 0; i < 5; i++) {
            const randomDate = getRandomDate(startDate, endDate);
            const formattedDate = format(randomDate, "yyyy-MM-dd'T'HH:mm:ss");

            eventPromises.push(
                prisma.event.create({
                    data: {
                        title: faker.lorem.sentence(),
                        description: faker.lorem.paragraph(),
                        type: eventTypes[i],
                        date: new Date(formattedDate), // Use the random date
                        organiserID: organizer.id,
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
