import { prisma } from "./src/utils/prisma.js";
async function main() {
    const allUsers = await prisma.users.findMany();
    console.log("All users", JSON.stringify(allUsers, null, 2));
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=script.js.map