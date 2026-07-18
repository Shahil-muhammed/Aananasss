import { QuoteSectionData } from "./quote.types";

export const quoteSectionData: QuoteSectionData = {
  labelEn: "FROM THE\nFOUNDING\nNOTES",
  labelAr: "من\nالبدايات", // Matches the image text "من البدايات"

  dateEn: "JULY 2017",
  dateAr: "يوليو ٢٠١٧", // Uses the clean Arabic numerals shown in the layout

  // Breaks exactly into 3 lines matching the English layout
  quoteEn:
    "Ananas should feel like an\noasis in the city. Step inside,\nand the day slows by half.",

  // Breaks exactly into 3 lines matching the Arabic layout
  quoteAr:
    "من البداية، كانت الفكرة أن يكون\nأناناس واحة وسط المدينة، مكاناً يهدأ فيه\nإيقاع اليوم.",

  footerEn: " ANANAS, FOUNDING NOTES • KUWAIT, 2017",
  footerAr: "— أناناس", // Matches the simple "— أناناس" footer shown in the image
};