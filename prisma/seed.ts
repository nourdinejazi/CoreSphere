import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function convertDateFormat(dateStr: string): string {
  let parts = dateStr.split("/");
  let year = +parts[2];
  let month = +parts[1] - 1;
  let day = +parts[0];

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    year < 0 ||
    month < 0 ||
    month > 11 ||
    day < 1 ||
    day > 31
  ) {
    return new Date().toISOString();
  }

  let dateObj = new Date(year, month, day);
  let formattedDate = dateObj.toISOString();

  if (formattedDate === "Invalid Date") {
    throw new Error(`Invalid date: ${dateStr}`);
  }

  return formattedDate;
}
async function seedDatabase() {
  try {
    const jsonData = fs.readFileSync("public/chequeseed.json", "utf-8");
    const jsonDataVbanks = fs.readFileSync("data/vbanks.json", "utf-8");

    let data = JSON.parse(jsonData);
    let vbanks = JSON.parse(jsonDataVbanks);

    data = data.map((cheque: any) => {
      cheque.date = cheque.date ? convertDateFormat(cheque.date) : new Date();
      cheque.createdAt = cheque.date
        ? convertDateFormat(cheque.createdAt)
        : new Date();
      cheque.montant = parseFloat(cheque.montant);
      cheque.payement = parseFloat(cheque.payement);
      cheque.nche = cheque.nche ? cheque.nche.toString() : "";
      return cheque;
    });

    // Seed the database
    // await prisma.cheque.createMany({
    //   data,
    // });

    // await prisma.banks.createMany({
    //   data: vbanks,
    // });

    // const data = {
    //   codeBanque: "TAITE",
    //   nche: "0000004",
    //   lib: "TRAITE THOURAYA HICHERI MDD03/02AT.",
    //   createdAt: "20/5/2006",
    //   montant: "200,000",
    //   date: "15/10/2001",
    //   ver: "",
    //   codeBoutique: "CHAR",
    //   payement: "0,000",
    //   type: "GAR",
    //   nver: "",
    // };
    // console.log("created aat : ", new Date(convertDateFormat(data.createdAt)));
    // console.log("dateeee : ", new Date(convertDateFormat(data.date)));

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
  }
}

seedDatabase();
