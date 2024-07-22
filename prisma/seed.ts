import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Function to generate a random date within a specified range
function getRandomDate(start: Date, end: Date): Date {
    const dateRange = end.getTime() - start.getTime();
    const randomTime = Math.random() * dateRange + start.getTime();
    return new Date(randomTime);
}

async function main() {
    // Create event types
    const eventTypes = ['A', 'B', 'C', 'D', 'E'].map(name => ({ name }));
    await prisma.category.createMany({ data: eventTypes });

    // Retrieve event types from the database
    const eventTypeRecords = await prisma.category.findMany();

    // Create locations
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'].map(name => ({ name }));
    await prisma.location.createMany({ data: locations });

    // Retrieve locations from the database
    const locationRecords = await prisma.location.findMany();

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

    // Define date range for random dates
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date(2024, 11, 31); // December 31, 2024

    // Create 5 events for each organizer with random dates, event types, and locations
    for (const organizer of createdOrganizers) {
        const eventPromises = [];
        for (let i = 0; i < 5; i++) {
            const randomDate = getRandomDate(startDate, endDate);
            const randomEventType = eventTypeRecords[Math.floor(Math.random() * eventTypeRecords.length)];
            const randomLocation = locationRecords[Math.floor(Math.random() * locationRecords.length)];

            eventPromises.push(
                prisma.event.create({
                    data: {
                        title: faker.lorem.sentence(),
                        description: faker.lorem.paragraph(),
                        date: randomDate,
                        organiserID: organizer.id,
                        eventTypeID: randomEventType.id,
                        locationId: randomLocation.id, // Use locationId to reference the Location table
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
