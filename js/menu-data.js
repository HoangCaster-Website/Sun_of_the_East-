/**
 * Sun of the East — Vollständige Speisekarte (24 Seiten PDF)
 * Alle Nummern, Namen, Beschreibungen, Preise, Varianten, Allergene & Zusatzstoffe
 * wurden exakt aus Sun_of_the_East_Redesigned_24_Pages.pdf übernommen.
 */

const sunMenuData = {
  allergene: [
    { code: "01", label: "Glutenhaltiges Getreide (Weizen, Gerste)" },
    { code: "02", label: "Krebstiere" },
    { code: "03", label: "Eier" },
    { code: "04", label: "Fisch" },
    { code: "05", label: "Erdnüsse" },
    { code: "06", label: "Soja" },
    { code: "07", label: "Milch (einschließlich Laktose)" },
    { code: "08", label: "Schalenfrüchte (Mandeln)" },
    { code: "09", label: "Sellerie" },
    { code: "10", label: "Senf" },
    { code: "11", label: "Sesam" },
    { code: "12", label: "Schwefeldioxid und Sulfite" },
    { code: "13", label: "Lupinen" },
    { code: "14", label: "Weichtiere" }
  ],
  zusatzstoffe: [
    { code: "a", label: "koffeinhaltig" },
    { code: "b", label: "chininhaltig" },
    { code: "c", label: "mit Farbstoff" },
    { code: "d", label: "mit Konservierungsstoff" },
    { code: "e", label: "mit Antioxidationsmittel" },
    { code: "f", label: "mit Geschmacksverstärker" },
    { code: "g", label: "mit Süßungsmittel(n)" },
    { code: "h", label: "enthält eine Phenylalaninquelle" },
    { code: "i", label: "erhöhter Koffeingehalt, für Kinder und schwangere oder stillende Frauen nicht empfohlen (32 mg/100 ml)" }
  ],
  auswahl: [
    { code: "A", label: "Tofu" },
    { code: "B", label: "Rindfleisch" },
    { code: "C", label: "Garnelen" },
    { code: "D", label: "Hähnchen" },
    { code: "E", label: "Ente" },
    { code: "F", label: "Avocado" },
    { code: "L", label: "Lachs" }
  ],
  categories: [
    {
      id: "suppen-vorspeisen",
      label: "Suppen & Vorspeisen",
      groups: [
        {
          title: "Suppen",
          items: [
            {
              num: "1",
              name: "Misosuppe",
              allergens: "1,6",
              desc: "Japanische Suppe mit Misopaste.",
              variants: [
                { label: "A) Mit Tofu", price: "5,90 €" },
                { label: "L) Mit Lachs", allergens: "4", price: "6,50 €" }
              ]
            },
            {
              num: "2",
              name: "Wantan-Suppe (3 Stk.)",
              allergens: "1,2,3,6,11",
              desc: "Wantan mit Garnelen und Hähnchen in klarer Brühe mit Karotten, Pak Choi, Sesam, Zwiebeln und Koriander.",
              price: "6,50 €"
            },
            {
              num: "3",
              name: "Thai-Kokossuppe",
              allergens: "6",
              desc: "Leicht scharfe Suppe mit Kokosmilch, Zitronengras, Galgant, Limettenblättern, Pilzen, Tomate und Chili.",
              variants: [
                { label: "C) Mit Garnelen", allergens: "2", price: "6,50 €" },
                { label: "D) Mit Hähnchen", price: "5,90 €" }
              ]
            }
          ]
        },
        {
          title: "Salate",
          items: [
            {
              num: "10",
              name: "Seetangsalat",
              allergens: "6,11,c",
              desc: "Wakame-Algen mit Sesam.",
              price: "4,90 €"
            },
            {
              num: "11",
              name: "Mangosalat",
              allergens: "6",
              desc: "Mango, Salat, Karotte, Gurke und frische Kräuter mit Hausdressing.",
              variants: [
                { label: "A) Mit Tofu", price: "6,90 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "7,90 €" },
                { label: "D) Mit Hähnchen", price: "7,50 €" }
              ]
            }
          ]
        },
        {
          title: "Kleine Häppchen",
          items: [
            {
              num: "12",
              name: "Edamame",
              allergens: "6",
              desc: "Grüne Sojabohnen mit Meersalz (vegan).",
              price: "5,50 €"
            },
            {
              num: "13",
              name: "Mini-Frühlingsrollen (6 Stk.)",
              allergens: "1,6",
              desc: "Knusprig frittiert, mit Gemüse und Glasnudeln (vegetarisch).",
              price: "4,50 €"
            },
            {
              num: "14",
              name: "Vietnamesische Frühlingsrollen (2 Stk.)",
              allergens: "1,3",
              desc: "Mit Fleisch, Glasnudeln, Karotten, Mu-Err-Pilzen und Zwiebeln.",
              price: "5,50 €"
            },
            {
              num: "15",
              name: "Gyoza (5 Stk.)",
              allergens: "1,3,6",
              desc: "Gebratene japanische Teigtaschen mit Fleisch- oder Gemüsefüllung, Kohl und Zwiebeln.",
              price: "4,90 €"
            },
            {
              num: "16",
              name: "Gebratene Wantan (5 Stk.)",
              allergens: "1,2,3",
              desc: "Knusprig gebratene Teigtaschen mit Garnelen, Hähnchen, Zwiebeln und Mu-Err-Pilzen.",
              price: "5,90 €"
            },
            {
              num: "17",
              name: "Sommerrollen (2 Stk.)",
              allergens: "6",
              desc: "Reispapier mit Reisnudeln, Salat, Gurke, Karotte und frischen Kräutern.",
              variants: [
                { label: "A) Mit Tofu", price: "5,50 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "6,90 €" },
                { label: "D) Mit Hähnchen", price: "6,50 €" },
                { label: "F) Mit Avocado", price: "4,90 €" }
              ]
            },
            {
              num: "18",
              name: "Hähnchenspieße Teriyaki (3 Stk.)",
              allergens: "1,6,11",
              desc: "Gegrillte Hähnchenspieße mit Teriyaki-Sauce, Sesam und Frühlingszwiebeln.",
              price: "5,90 €"
            },
            {
              num: "19",
              name: "Knusprige Garnelen (5 Stk.)",
              allergens: "1,2,3",
              desc: "Paniert und knusprig frittiert.",
              price: "6,90 €"
            }
          ]
        }
      ]
    },
    {
      id: "pho-bun",
      label: "Phở & Bún",
      groups: [
        {
          title: "Phở, Bún & Nudelsuppen",
          items: [
            {
              num: "30",
              name: "Phở Hà Nội",
              allergens: "6",
              desc: "Vietnamesische Reisbandnudelsuppe mit Zwiebeln, Koriander, frischen Kräutern und Limette.",
              variants: [
                { label: "B) Mit Rindfleisch", price: "15,50 €" },
                { label: "D) Mit Hähnchen", price: "14,90 €" }
              ]
            },
            {
              num: "31",
              name: "Ramen mit Rind und Wantan",
              allergens: "1,2,3,6",
              desc: "Ramen-Nudeln in Brühe mit Rindfleisch, Wantan, Blattgemüse und Frühlingszwiebeln.",
              price: "16,50 €"
            },
            {
              num: "32",
              name: "Glasnudeln mit Rind und Wantan",
              allergens: "1,2,3,6",
              desc: "Glasnudeln in Brühe mit Rindfleisch, Wantan, Blattgemüse und Frühlingszwiebeln.",
              price: "16,50 €"
            }
          ]
        },
        {
          title: "Bún & Reisnudelschalen",
          items: [
            {
              num: "33",
              name: "Bún bò Nam Bộ",
              allergens: "1,4,5,6",
              desc: "Reisnudeln mit gebratenem Rindfleisch, Salat, Sprossen, Gurke, Kräutern, Erdnüssen, Röstzwiebeln und Fischsauce.",
              price: "15,50 €"
            },
            {
              num: "34",
              name: "Reisnudelschale mit Frühlingsrollen",
              allergens: "1,3,4,6",
              desc: "Reisnudeln mit knusprigen Frühlingsrollen, Salat, Gurke, Karotte, Kräutern und süß-saurer Fischsauce.",
              price: "15,50 €"
            }
          ]
        },
        {
          title: "Nudeln mit Dressing",
          note: "Mit Salat, Gurke, Karotte, frischen Kräutern und Hausdressing.",
          items: [
            {
              num: "40",
              name: "Phở-Nudeln mit Dressing",
              allergens: "6",
              desc: "Reisbandnudeln.",
              variants: [
                { label: "A) Mit Tofu", price: "12,90 €" },
                { label: "B) Mit Rindfleisch", price: "14,90 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "14,90 €" },
                { label: "D) Mit Hähnchen", price: "13,90 €" }
              ]
            },
            {
              num: "41",
              name: "Glasnudeln mit Dressing",
              allergens: "6",
              desc: "Mit Salat, Gurke, Karotte, frischen Kräutern und Hausdressing.",
              variants: [
                { label: "A) Mit Tofu", price: "12,90 €" },
                { label: "B) Mit Rindfleisch", price: "14,90 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "14,90 €" },
                { label: "D) Mit Hähnchen", price: "13,90 €" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "reis-nudeln",
      label: "Reis & Nudeln",
      groups: [
        {
          title: "Gebratene Nudeln & gebratener Reis",
          note: "Aus dem Wok mit Gemüse, Karotten und Zwiebeln.",
          items: [
            {
              num: "45",
              name: "Gebratene Phở-Nudeln",
              allergens: "6",
              desc: "Aus dem Wok mit Gemüse, Karotten und Zwiebeln.",
              variants: [
                { label: "A) Mit Tofu", price: "12,90 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "14,90 €" },
                { label: "D) Mit knusprigem Hähnchen", allergens: "1,3", price: "13,90 €" },
                { label: "E) Mit knuspriger Ente", allergens: "1,3", price: "14,90 €" }
              ]
            },
            {
              num: "46",
              name: "Gebratene Udon-Nudeln",
              allergens: "1,6",
              desc: "Dicke japanische Weizennudeln.",
              variants: [
                { label: "A) Mit Tofu", price: "14,50 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Mit knusprigem Hähnchen", allergens: "3", price: "15,90 €" },
                { label: "E) Mit knuspriger Ente", allergens: "3", price: "16,90 €" }
              ]
            },
            {
              num: "47",
              name: "Gebratene Nudeln",
              allergens: "1,6",
              desc: "Aus dem Wok mit Gemüse, Karotten und Zwiebeln.",
              variants: [
                { label: "A) Mit Tofu", price: "11,90 €" },
                { label: "B) Mit Rindfleisch", price: "14,90 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "14,90 €" },
                { label: "D) Mit knusprigem Hähnchen", allergens: "3", price: "13,90 €" },
                { label: "E) Mit knuspriger Ente", allergens: "3", price: "14,90 €" }
              ]
            },
            {
              num: "48",
              name: "Gebratener Reis",
              allergens: "6",
              desc: "Mit Karotte, Erbsen, Zwiebeln und Gewürzen.",
              variants: [
                { label: "A) Mit Tofu", price: "11,90 €" },
                { label: "B) Mit Rindfleisch", price: "14,90 €" },
                { label: "C) Mit Garnelen", allergens: "2", price: "14,90 €" },
                { label: "D) Mit knusprigem Hähnchen", allergens: "1,3", price: "13,90 €" },
                { label: "E) Mit knuspriger Ente", allergens: "1,3", price: "14,90 €" }
              ]
            }
          ]
        },
        {
          title: "Reisgerichte mit Sauce",
          note: "Alle Saucengerichte werden mit Gemüse und Reis serviert. Nudeln¹ statt Reis kosten 2,00 € Aufpreis. Auswahl: A) Tofu · B) Rindfleisch · C) Garnelen² · D) knuspriges Hähnchen¹,³ · E) knusprige Ente¹,³",
          items: [
            {
              num: "50",
              name: "Dunkle Sauce nach Hausart",
              allergens: "1,6",
              desc: "Mit Zwiebeln.",
              variants: [
                { label: "A) Tofu", price: "14,90 €" },
                { label: "B) Rindfleisch", price: "16,90 €" },
                { label: "C) Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Knuspriges Hähnchen", allergens: "1,3", price: "14,90 €" },
                { label: "E) Knusprige Ente", allergens: "1,3", price: "16,90 €" }
              ]
            },
            {
              num: "51",
              name: "Currysauce",
              allergens: "6,7",
              desc: "Mit Zwiebeln.",
              variants: [
                { label: "A) Tofu", price: "14,90 €" },
                { label: "B) Rindfleisch", price: "16,90 €" },
                { label: "C) Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Knuspriges Hähnchen", allergens: "1,3", price: "15,90 €" },
                { label: "E) Knusprige Ente", allergens: "1,3", price: "16,90 €" }
              ]
            },
            {
              num: "52",
              name: "Erdnusssauce",
              allergens: "5,6",
              desc: "Mit Zwiebeln.",
              variants: [
                { label: "A) Tofu", price: "14,90 €" },
                { label: "B) Rindfleisch", price: "16,90 €" },
                { label: "C) Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Knuspriges Hähnchen", allergens: "1,3", price: "15,90 €" },
                { label: "E) Knusprige Ente", allergens: "1,3", price: "16,90 €" }
              ]
            },
            {
              num: "53",
              name: "Süß-saure Sauce",
              allergens: "6",
              desc: "Mit Ananas und Tomate.",
              variants: [
                { label: "A) Tofu", price: "14,90 €" },
                { label: "B) Rindfleisch", price: "16,90 €" },
                { label: "C) Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Knuspriges Hähnchen", allergens: "1,3", price: "15,90 €" },
                { label: "E) Knusprige Ente", allergens: "1,3", price: "16,90 €" }
              ]
            },
            {
              num: "54",
              name: "Mangosauce",
              allergens: "6",
              desc: "Mit frischer Mango und Gewürzen.",
              variants: [
                { label: "A) Tofu", price: "14,90 €" },
                { label: "B) Rindfleisch", price: "16,90 €" },
                { label: "C) Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Knuspriges Hähnchen", allergens: "1,3", price: "15,90 €" },
                { label: "E) Knusprige Ente", allergens: "1,3", price: "16,90 €" }
              ]
            },
            {
              num: "55",
              name: "Avocadosauce",
              allergens: "6",
              desc: "Mit Avocado und Gewürzen.",
              variants: [
                { label: "A) Tofu", price: "14,90 €" },
                { label: "B) Rindfleisch", price: "16,90 €" },
                { label: "C) Garnelen", allergens: "2", price: "16,90 €" },
                { label: "D) Knuspriges Hähnchen", allergens: "1,3", price: "15,90 €" },
                { label: "E) Knusprige Ente", allergens: "1,3", price: "16,90 €" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "wok-spezialitaeten",
      label: "Wok & Menüs für zwei",
      groups: [
        {
          title: "Wok- und Hausspezialitäten",
          note: "Alle Gerichte werden mit Reis serviert. Nudeln statt Reis kosten 2,00 € Aufpreis. Zur Wahl stehen Currysauce (6,7), Teriyaki-Sauce (1,6), dunkle Sauce (1,6) und Thai-Sauce (1,6).",
          items: [
            {
              num: "60",
              name: "Rindfleisch mit Thai-Sauce",
              allergens: "1,6",
              desc: "Mit Gemüse.",
              price: "17,90 €"
            },
            {
              num: "61",
              name: "Rindfleisch mit Zwiebeln",
              allergens: "6",
              desc: "Mit Zwiebeln und Gemüse.",
              price: "17,90 €"
            },
            {
              num: "62",
              name: "Rindfleisch mit Blattgemüse",
              allergens: "6",
              desc: "Mit Blattgemüse und Knoblauch.",
              price: "17,90 €"
            },
            {
              num: "63",
              name: "Garnelen mit Thai-Sauce",
              allergens: "1,2,6",
              desc: "Mit Gemüse.",
              price: "17,90 €"
            },
            {
              num: "64",
              name: "Meeresfrüchte mit Thai-Sauce",
              allergens: "1,2,6,14",
              desc: "Garnelen, Tintenfisch und weitere Meeresfrüchte mit Gemüse.",
              price: "18,90 €"
            },
            {
              num: "65",
              name: "Meeresfrüchte mit Ananas",
              allergens: "2,6,14",
              desc: "Meeresfrüchte mit Ananas, Gemüse und Sauce.",
              price: "19,90 €"
            },
            {
              num: "66",
              name: "Sun of the East Bò lúc lắc",
              allergens: "6",
              desc: "Kurz gebratene Rindfleischwürfel mit Zwiebeln und Paprika, serviert mit einer Beilage.",
              price: "19,90 €"
            },
            {
              num: "67",
              name: "Sun of the East Ente mit Basilikum",
              allergens: "6",
              desc: "Im Wok gebratene Ente mit Basilikum, Zwiebeln, Chili und Gemüse (scharf).",
              price: "20,90 €"
            },
            {
              num: "68",
              name: "Gegrillter Lachs",
              allergens: "4",
              desc: "Mit Gemüse.",
              price: "19,90 €"
            }
          ]
        },
        {
          title: "Extras",
          items: [
            { num: "+", name: "Extra Gemüse", desc: "Zusätzliche Portion frisches Gemüse.", price: "3,00 €" },
            { num: "+", name: "Extra Nudeln", allergens: "1", desc: "Zusätzliche Portion Nudeln.", price: "3,00 €" },
            { num: "+", name: "Extra Reis", desc: "Zusätzliche Portion Duftreis.", price: "3,00 €" },
            { num: "+", name: "Extra Soße", desc: "Currysauce (6,7), Teriyaki-Sauce (1,6), Dunkle Sauce (1,6) oder Thai-Sauce (1,6).", price: "3,00 €" }
          ]
        },
        {
          title: "Menüs für zwei Personen",
          note: "Die Angaben zu Allergenen finden Sie bei den jeweiligen Vorspeisen und Desserts.",
          items: [
            {
              num: "M1",
              name: "Menü 1 (für 2 Personen)",
              allergens: "1,3,6,7",
              desc: "2 Vorspeisen nach Wahl · Ente mit dunkler Sauce (1,3,6) · Knuspriges Hähnchen mit Currysauce (1,3,6,7) · 2 Desserts nach Wahl.",
              price: "41,90 €"
            },
            {
              num: "M2",
              name: "Menü 2 (für 2 Personen)",
              allergens: "1,2,3,5,6",
              desc: "2 Vorspeisen nach Wahl · Ente mit dunkler Sauce (1,3,6) · Garnelen mit Erdnusssauce (2,5,6) · 2 Desserts nach Wahl.",
              price: "42,90 €"
            },
            {
              num: "M3",
              name: "Menü 3 (für 2 Personen)",
              allergens: "1,3,6,7",
              desc: "2 Vorspeisen nach Wahl · Ente mit Currysauce (1,3,6,7) · Rindfleisch mit Thai-Sauce (1,6) · 2 Desserts nach Wahl.",
              price: "42,90 €"
            },
            {
              num: "M4",
              name: "Menü 4 (für 2 Personen)",
              allergens: "1,2,6,14",
              desc: "2 Vorspeisen nach Wahl · Meeresfrüchte mit Thai-Sauce (1,2,6,14) · Sun of the East Ente mit Basilikum (6) · 2 Desserts nach Wahl.",
              price: "48,90 €"
            }
          ]
        }
      ]
    },
    {
      id: "sushi-sashimi-nigiri",
      label: "Sashimi & Nigiri",
      groups: [
        {
          title: "Sashimi",
          note: "Wir servieren unser Sushi mit Sojasauce (1,6), Wasabi und eingelegtem Ingwer.",
          items: [
            { num: "SA1", name: "Sashimi Lachs (6 Stk.)", allergens: "4", price: "16,90 €" },
            { num: "SA2", name: "Sashimi Thunfisch (6 Stk.)", allergens: "4", price: "17,90 €" },
            { num: "SA3", name: "Sashimi Mix Lachs & Thunfisch (6 Stk.)", allergens: "4", price: "17,90 €" },
            { num: "SA4", name: "Sashimi Mix Lachs, Thunfisch & Avocado (12 Stk.)", allergens: "4", price: "21,90 €" }
          ]
        },
        {
          title: "Nigiri · 2 Stk.",
          items: [
            { num: "N1", name: "Lachs", allergens: "4", price: "5,40 €" },
            { num: "N2", name: "Lachs flambiert", allergens: "4", price: "5,90 €" },
            { num: "N3", name: "Thunfisch", allergens: "4", price: "5,90 €" },
            { num: "N4", name: "Thunfisch flambiert", allergens: "4", price: "6,10 €" },
            { num: "N5", name: "Avocado", price: "4,90 €" },
            { num: "N6", name: "Mango", price: "4,90 €" },
            { num: "N7", name: "Inari", allergens: "1,6", desc: "Süß marinierte Tofutasche. (vegetarisch)", price: "4,90 €" },
            { num: "N8", name: "Unagi", allergens: "1,4,6", desc: "Aal mit Unagi-Sauce.", price: "5,40 €" },
            { num: "N9", name: "Ebi", allergens: "2", desc: "Gekochte Garnele.", price: "5,40 €" },
            { num: "N10", name: "California", allergens: "1,2,3,4", price: "5,40 €" }
          ]
        }
      ]
    },
    {
      id: "maki-insideout",
      label: "Maki & Inside-Out",
      groups: [
        {
          title: "Maki",
          items: [
            { num: "M1", name: "Avocado", price: "5,40 €" },
            { num: "M2", name: "Gurke", price: "5,40 €" },
            { num: "M3", name: "Rettich", price: "5,40 €" },
            { num: "M4", name: "Mango", price: "5,40 €" },
            { num: "M5", name: "Lachs", allergens: "4", price: "5,90 €" },
            { num: "M6", name: "Lachs-Avocado", allergens: "4", price: "6,10 €" },
            { num: "M7", name: "Spicy Lachs", allergens: "4,6", price: "6,10 €" },
            { num: "M8", name: "Thunfisch", allergens: "4", price: "6,10 €" },
            { num: "M9", name: "Thunfisch-Gurke", allergens: "4", price: "6,30 €" },
            { num: "M10", name: "Spicy Thunfisch", allergens: "4,6", price: "6,40 €" },
            { num: "M11", name: "Gekochter Thunfisch", allergens: "4", price: "6,10 €" },
            { num: "M12", name: "Unagi", allergens: "1,4,6", desc: "Aal.", price: "6,10 €" },
            { num: "M13", name: "Ebi", allergens: "2", desc: "Garnele.", price: "6,10 €" },
            { num: "M14", name: "California", allergens: "1,2,3,4", price: "5,60 €" },
            { num: "M15", name: "Ebi Tempura", allergens: "1,2,3", price: "6,40 €" },
            { num: "M16", name: "Spicy Ebi", allergens: "2,6", price: "6,10 €" },
            { num: "M17", name: "Ente", allergens: "1", price: "6,10 €" },
            { num: "M18", name: "Tori", allergens: "1", desc: "Hähnchen.", price: "6,10 €" }
          ]
        },
        {
          title: "Vegetarische Inside-Out-Rolls (außen mit Sesam¹¹)",
          note: "Reis außen, Füllung innen.",
          items: [
            { num: "I 1", name: "Avocado", allergens: "11", price: "7,90 €" },
            { num: "I 2", name: "Gurke", allergens: "11", price: "7,90 €" },
            { num: "I 3", name: "Avocado & Gurke", allergens: "11", price: "7,90 €" },
            { num: "I 4", name: "Vegan", allergens: "11", desc: "Avocado, Gurke und Rettich.", price: "8,10 €" }
          ]
        },
        {
          title: "Inside-Out-Rolls mit Fischrogen⁴ oder Sesam¹¹ nach Wahl",
          items: [
            { num: "I 5", name: "California", allergens: "1,2,3,4", desc: "California-Füllung, Avocado und Fischrogen.", price: "9,90 €" },
            { num: "I 6", name: "Lachs", allergens: "4", desc: "Lachs, Avocado und Fischrogen.", price: "9,10 €" },
            { num: "I 7", name: "Lachs Philadelphia", allergens: "4,7", desc: "Lachs, Avocado, Gurke, Frischkäse und Fischrogen.", price: "9,50 €" },
            { num: "I 8", name: "Hot Spicy Lachs", allergens: "4,6", desc: "Lachs, Chili-Sauce, Frühlingszwiebeln, Gurke und Fischrogen (scharf).", price: "9,50 €" },
            { num: "I 9", name: "Thunfisch", allergens: "4", desc: "Thunfisch, Gurke und Fischrogen.", price: "9,90 €" },
            { num: "I 10", name: "Hot Thunfisch", allergens: "4,6", desc: "Thunfisch, Gurke, Frühlingszwiebeln, Chili-Sauce und Fischrogen (scharf).", price: "9,90 €" },
            { num: "I 11", name: "Ebi gekocht", allergens: "2,4", desc: "Gekochte Garnelen, Avocado und Fischrogen.", price: "9,90 €" },
            { num: "I 12", name: "Ebi Spicy", allergens: "2,4,6", desc: "Garnelen, Gurke, Frühlingszwiebeln, Chili-Sauce und Fischrogen (scharf).", price: "9,90 €" },
            { num: "I 13", name: "Ebi Tempura", allergens: "1,2,3,4,7", desc: "Tempura-Garnelen, Avocado, Frischkäse und Fischrogen.", price: "10,50 €" },
            { num: "I 14", name: "California Spezial", allergens: "1,2,3,4", desc: "California-Füllung, Avocado und Fischrogen.", price: "9,90 €" }
          ]
        },
        {
          title: "Klassische Inside-Out-Rolls (außen mit Sesam¹¹)",
          items: [
            { num: "I 15", name: "Tori", allergens: "11", desc: "Hähnchen, Frühlingszwiebeln und Gurke.", price: "10,50 €" },
            { num: "I 16", name: "Ente", allergens: "11", desc: "Ente, Frühlingszwiebeln und Gurke.", price: "10,90 €" },
            { num: "I 17", name: "Gekochter Thunfisch", allergens: "4,11", desc: "Thunfisch und Gurke.", price: "9,90 €" },
            { num: "I 18", name: "Unagi", allergens: "1,4,6,11", desc: "Aal, Avocado und Gurke.", price: "10,90 €" }
          ]
        }
      ]
    },
    {
      id: "special-rolls-crunchy",
      label: "Crunchy & Special Rolls",
      groups: [
        {
          title: "Crunchy Maki · 8 Stk.",
          note: "Knusprig frittiert (1,3). Serviert mit Cocktailsauce (3,10) und Teriyaki-Sauce (1,6) sowie Sesam (11).",
          items: [
            { num: "C1", name: "Lachs Crunchy", allergens: "1,3,4", price: "7,90 €" },
            { num: "C2", name: "Thunfisch Crunchy", allergens: "1,3,4", price: "8,90 €" },
            { num: "C3", name: "Gekochter Thunfisch Crunchy", allergens: "1,3,4", price: "8,90 €" }
          ]
        },
        {
          title: "Tempura-Futomaki · 6 Stk.",
          note: "Große Rolle im Tempurateig, knusprig frittiert. Serviert mit Cocktailsauce (3,10) und Teriyaki-Sauce (1,6).",
          items: [
            { num: "F1", name: "Veggie Crunchy", allergens: "1", desc: "Avocado, Gurke und Rettich.", price: "9,50 €" },
            { num: "F2", name: "Sake Crunchy", allergens: "1,3,4,7", desc: "Lachs, Avocado, Gurke und Frischkäse.", price: "10,90 €" },
            { num: "F3", name: "Thunfisch Crunchy", allergens: "1,3,4,7", desc: "Thunfisch, Gurke, Frühlingszwiebeln und Frischkäse.", price: "11,90 €" },
            { num: "F4", name: "Ebi Crunchy", allergens: "1,2,3,7", desc: "Gekochte Garnelen, Avocado, Gurke und Frischkäse.", price: "11,90 €" },
            { num: "F5", name: "Cali Crunchy", allergens: "1,2,3,4,7", desc: "California-Füllung, Avocado, Gurke und Frischkäse.", price: "10,90 €" }
          ]
        },
        {
          title: "Special Rolls · 8 Stk.",
          note: "Serviert mit Cocktailsauce (3,10) und Teriyaki-Sauce (1,6) sowie Sesam (11).",
          items: [
            { num: "R1", name: "Dragon Roll", allergens: "1,2,3,4,6,7,11", desc: "Tempura-Garnelen, Gurke und Frischkäse, belegt mit Aal.", price: "18,90 €" },
            { num: "R2", name: "Tiger Roll", allergens: "1,2,3,4,6,7,11", desc: "Tempura-Garnelen, Gurke und Frischkäse, belegt mit Lachs.", price: "17,90 €" },
            { num: "R3", name: "Fire Tuna Roll", allergens: "4,6,11", desc: "Scharfer Thunfisch, Rucola und Mango, belegt mit flambiertem Thunfisch (scharf).", price: "18,90 €" },
            { num: "R4", name: "Rainbow Roll", allergens: "1,2,3,4,6,7,11", desc: "California-Füllung, Avocado und Frischkäse, belegt mit Lachs und Thunfisch.", price: "18,90 €" },
            { num: "R5", name: "Veggie Roll", allergens: "11", desc: "Gurke, Rettich und Rucola, belegt mit Avocado.", price: "14,90 €" },
            { num: "R6", name: "Ente Roll", allergens: "4,7,11", desc: "Ente, Gurke und Frischkäse, belegt mit Lachs.", price: "18,90 €" },
            { num: "R7", name: "Mix Roll", allergens: "1,2,3,4,6,7,11", desc: "Tempura-Garnelen, Avocado und Frischkäse, belegt mit Lachs, Thunfisch und Aal.", price: "19,90 €" },
            { num: "R8", name: "Lachs Roll", allergens: "1,3,4,7,11", desc: "Tempura-Lachs, Avocado und Frischkäse, belegt mit flambiertem Lachs.", price: "18,90 €" },
            { num: "R9", name: "Thunfisch Roll", allergens: "1,3,4,7,11", desc: "Tempura-Thunfisch, Gurke und Frischkäse, belegt mit flambiertem Thunfisch.", price: "19,90 €" },
            { num: "R10", name: "Lachs-Thunfisch Roll", allergens: "4,7,11", desc: "Avocado, Gurke, Rucola und Frischkäse, belegt mit Lachs und Thunfisch.", price: "18,90 €" }
          ]
        }
      ]
    },
    {
      id: "sushi-bowls-menues",
      label: "Bowls & Sushi-Menüs",
      groups: [
        {
          title: "Sushi-Bowls",
          note: "Sushi-Reis mit gemischtem Salat, Edamame (6), Gurke, Avocado, Mango, Paprika, Rettich und Seetangsalat (6,11,c), dazu Cocktailsauce (3,10) und Teriyaki-Sauce (1,6).",
          items: [
            { num: "B1", name: "Lachs-Sashimi Bowl", allergens: "4", price: "15,90 €" },
            { num: "B2", name: "Gekochter Lachs Bowl", allergens: "4", price: "15,90 €" },
            { num: "B3", name: "Thunfisch-Sashimi Bowl", allergens: "4", price: "16,90 €" },
            { num: "B4", name: "Gekochter Thunfisch Bowl", allergens: "4", price: "16,90 €" },
            { num: "B5", name: "Ebi-Tempura Bowl", allergens: "1,2,3", price: "16,90 €" },
            { num: "B6", name: "Tofu Bowl", allergens: "6", price: "14,90 €" },
            { num: "B7", name: "Mix-Sashimi Bowl", allergens: "4", desc: "Lachs und Thunfisch.", price: "16,90 €" },
            { num: "B8", name: "Mix Bowl", allergens: "4", desc: "Lachs und gekochter Thunfisch.", price: "16,90 €" }
          ]
        },
        {
          title: "Vegetarische Sushi-Menüs",
          items: [
            { num: "Combo 1", name: "Veggie Combo 1 (18 Stück)", desc: "6 Avocado-Maki, 6 Gurken-Maki, 6 Rettich-Maki.", price: "12,90 €" },
            { num: "Combo 2", name: "Veggie Combo 2 (20 Stück)", allergens: "11", desc: "6 Avocado-Maki, 6 Gurken-Maki, 8 vegane Inside-Out-Rolls.", price: "14,90 €" },
            { num: "Combo 3", name: "Veggie Combo 3 (14 Stück)", allergens: "1,3,6,11", desc: "2 Nigiri (Inari, Avocado), 6 Gurken-Maki, 6 Veggie Crunchy.", price: "17,90 €" },
            { num: "Combo 4", name: "Veggie Combo 4 (29 Stück)", allergens: "1,3,6,11", desc: "3 Nigiri (Inari, Avocado, Mango), 12 Avocado-Gurken-Maki, 8 vegane Inside-Out-Rolls, 6 Veggie Crunchy.", price: "28,90 €" }
          ]
        },
        {
          title: "Klassische Sushi-Menüs",
          items: [
            { num: "Combo 5", name: "Klassik Combo 5 (18 Stück)", allergens: "4", desc: "6 Avocado-Maki, 6 Gurken-Maki, 6 Lachs-Maki.", price: "13,90 €" },
            { num: "Combo 6", name: "Klassik Combo 6 (16 Stück)", allergens: "4,11", desc: "2 Lachs-Nigiri, 6 Lachs-Maki, 8 Lachs-Inside-Out-Rolls.", price: "17,90 €" },
            { num: "Combo 7", name: "Klassik Combo 7 (16 Stück)", allergens: "4,11", desc: "2 Thunfisch-Nigiri, 6 Thunfisch-Maki, 8 Thunfisch-Inside-Out-Rolls.", price: "18,90 €" },
            { num: "Combo 8", name: "Klassik Combo 8 (14 Stück)", allergens: "1,3,4,7,11", desc: "2 Nigiri (Lachs, Thunfisch), 6 Lachs-Maki, 6 Sake Crunchy.", price: "18,90 €" },
            { num: "Combo 9", name: "Klassik Combo 9 (23 Stück)", allergens: "2,4,11", desc: "3 Nigiri (Lachs, Thunfisch, Ebi), 6 Lachs-Maki, 6 Thunfisch-Maki, 8 Lachs-Inside-Out-Rolls.", price: "23,90 €" },
            { num: "Combo 10", name: "Klassik Combo 10 (21 Stück)", allergens: "1,2,3,4,7,11", desc: "3 Nigiri (Lachs, Thunfisch, Ebi), 6 Lachs-Maki, 6 Thunfisch-Maki, 6 Sake Crunchy.", price: "23,90 €" }
          ]
        },
        {
          title: "Große Sushi-Menüs",
          items: [
            { num: "Combo 11", name: "Großes Menü Combo 11 (36 Stück)", allergens: "1,2,3,4,6,7,11", desc: "4 Nigiri (Lachs, Thunfisch, Ebi, Unagi), 6 Avocado-Maki, 6 Gurken-Maki, 6 Lachs-Maki, 8 Lachs-Inside-Out-Rolls, 6 Sake Crunchy.", price: "35,90 €" },
            { num: "Combo 12", name: "Großes Menü Combo 12 (41 Stück)", allergens: "1,2,3,4,6,7,11", desc: "3 Nigiri (Lachs, Thunfisch, Unagi), 6 Lachs-Avocado-Maki, 6 Ebi-Maki, 6 Avocado-Maki, 6 Gurken-Maki, 8 Inside-Out-Rolls mit gekochtem Thunfisch, 6 Ebi Crunchy.", price: "38,90 €" },
            { num: "Combo 13", name: "Großes Menü Combo 13", allergens: "1,2,3,4,6,7,11", desc: "5 Nigiri (2 Lachs, 1 Thunfisch, 1 Ebi, 1 Unagi), Avocado-, Gurken- und Spicy-Lachs-Maki, Ebi-Avocado-Maki, Tori- und California-Inside-Out-Rolls, Thunfisch Crunchy.", price: "49,90 €" }
          ]
        },
        {
          title: "Sun of the East Spezialmenüs",
          note: "Jedes Menü mit Vorspeisen und Desserts Nach Wahl.",
          items: [
            { num: "SM1", name: "Spezialmenü 1", allergens: "1,2,3,4,6,7,11", desc: "2 Nach Wahl, Sashimi vom Lachs und Thunfisch, 4 Nigiri, Avocado-, Gurken- und Lachs-Avocado-Maki, California und Tazuna Rolls, 6 Ebi Tempura.", price: "79,90 €" },
            { num: "SM2", name: "Spezialmenü 2", allergens: "1,2,3,4,6,7,11", desc: "3 Nach Wahl, Sashimi vom Lachs und Thunfisch, 6 Nigiri, Avocado-, Gurken-, Lachs- und Ebi-Maki, California und Tiger Rolls, 6 Sake Crunchy.", price: "89,90 €" },
            { num: "SM3", name: "Spezialmenü 3", allergens: "1,2,3,4,6,7,11", desc: "4 Nach Wahl, Sashimi vom Lachs und Thunfisch, 6 Nigiri, Avocado-, Gurken-, Rettich-, Lachs- und Thunfisch-Maki, Lachs-Avocado, California und Dragon Rolls, 12 Lachs-Tempura und Veggie Rolls.", price: "99,90 €" },
            { num: "SM4", name: "Spezialmenü 4", allergens: "1,2,3,4,6,7,11,c", desc: "4 Nach Wahl, Seetangsalat, Sashimi, 8 Nigiri, Avocado-, Gurken-, Lachs-Avocado-, Thunfisch-Gurken- und California Maki, Veggie und Tori Rolls, Tiger Rolls, 12 Lachs-Tempura und California Rolls.", price: "112,90 €" }
          ]
        }
      ]
    },
    {
      id: "desserts",
      label: "Desserts",
      groups: [
        {
          title: "Desserts",
          items: [
            { num: "D1", name: "Thailändischer Mango-Klebreis", desc: "Klebreis mit frischer Mango und Kokosmilch.", price: "6,90 €" },
            { num: "D2", name: "Frittierte Banane (4 Stk.)", allergens: "1,3", desc: "Im knusprigen Backteig.", price: "5,90 €" },
            { num: "D3", name: "Frittierter Apfel (3 Stk.)", allergens: "1,3", desc: "Im knusprigen Backteig.", price: "5,50 €" },
            { num: "D4", name: "Mochi (3 Stk.)", allergens: "6,7", desc: "Japanischer Klebreiskuchen mit Eis-, Bohnen- oder Fruchtfüllung.", price: "5,90 €" },
            { num: "D5", name: "Panna Cotta", allergens: "7", desc: "Mit Kokosmilch und Sahne.", price: "5,50 €" },
            { num: "D6", name: "Eis (3 Kugeln)", allergens: "3,6,7", desc: "Sorten nach Wahl: Joghurt, Mango, Schokolade, Vanille, Wassermelone.", price: "5,90 €" }
          ]
        }
      ]
    },
    {
      id: "getraenke",
      label: "Getränke & Bar",
      groups: [
        {
          title: "Kaffee · Lavazza",
          items: [
            { num: "101", name: "Espresso", allergens: "a", price: "2,70 €" },
            { num: "102", name: "Café Crema, klein", allergens: "a", price: "3,50 €" },
            { num: "103", name: "Café Crema, groß", allergens: "a", price: "3,95 €" },
            { num: "104", name: "Cappuccino", allergens: "a,7", price: "3,50 €" },
            { num: "105", name: "Doppelter Espresso", allergens: "a", price: "3,99 €" },
            { num: "106", name: "Milchkaffee", allergens: "a,7", price: "3,99 €" },
            { num: "107", name: "Latte Macchiato", allergens: "a,7", price: "3,99 €" }
          ]
        },
        {
          title: "Vietnamesischer Kaffee & Tee",
          items: [
            { num: "110", name: "Vietnamesischer Kaffee", allergens: "a,7", price: "4,50 €" },
            { num: "111", name: "Cà phê bạc xỉu", allergens: "a,7", desc: "Vietnamesischer Kaffee mit Milch und Kokosmilch.", price: "6,90 €" },
            { num: "112", name: "Hanoi Wintertee", allergens: "a", desc: "Grüner Tee, Pandanblätter, Longan.", price: "4,99 €" },
            { num: "113", name: "Rose Garden Tee", allergens: "a", desc: "Grüner Tee, Rosenblüten, Süßholz.", price: "4,99 €" },
            { num: "114", name: "Ingwer-Orangen-Tee", allergens: "a", desc: "Jasmintee, frischer Ingwer, Orange, Honig.", price: "4,99 €" },
            { num: "115", name: "Zitronengras-Limetten-Tee", allergens: "a", desc: "Grüner Tee, Zitronengras, Limette, Honig.", price: "4,99 €" },
            { num: "116", name: "Minztee", allergens: "a", desc: "Jasmintee, frische Minze, Limette, Honig.", price: "4,99 €" },
            { num: "117", name: "Sun of the East – Natura Aromen", desc: "Heißgetränk ohne Tee mit Minze, Ingwer, Orange, Zitronengras und Honig.", price: "5,50 €" },
            { num: "118", name: "Yuzu-Tee", desc: "Limette, Minze, Yuzu.", price: "4,99 €" }
          ]
        },
        {
          title: "Hausgemachte Getränke",
          items: [
            { num: "201", name: "Sun of the East Sunrise", allergens: "c", desc: "Limette, Rohrzucker, Sprudelwasser, Mangosaft, Maracujasaft, frisches Basilikum, Grenadine.", price: "7,99 €" },
            { num: "202", name: "Ginger Cooler", desc: "Limette, Ingwer, Sodawasser, Ginger Beer, Zuckersirup, Minze.", price: "7,99 €" },
            { num: "203", name: "Aloe Berry", allergens: "c", desc: "Limette, Zuckersirup, Aloe, Wild Berry, gemischte Beeren.", price: "7,99 €" },
            { num: "204", name: "Very Strawberry", desc: "Limette, Erdbeerpüree, Minze, Zuckersirup, Sodawasser.", price: "7,99 €" },
            { num: "205", name: "Mango Colada", desc: "Mangopüree, Ananassaft, Pfirsichsaft, Kokosmilch.", price: "7,99 €" },
            { num: "206", name: "Tokyo Yuzu", desc: "Limette, Minze, Sodawasser.", price: "7,99 €" },
            { num: "207", name: "Mango Lassi", desc: "Cremiges Mango-Kokos-Getränk mit Mangopüree, Mangonektar und Kokosmilch.", price: "6,00 €" },
            { num: "208", name: "Avocado Lassi", allergens: "6", desc: "Avocado, Kokosmilch, Banane, Sojamilch.", price: "6,50 €" }
          ]
        },
        {
          title: "Alkoholfreie Cocktails",
          items: [
            { num: "211", name: "Virgin Mojito", allergens: "c", desc: "Limette, Minze, Melonensirup, Zuckersirup, Rohrzucker, Sodawasser, Grenadine.", price: "8,00 €" },
            { num: "212", name: "Ipanema", allergens: "c", desc: "Minze, Limette, Ginger Ale, Maracujasaft, Zuckersirup, Limettensaft.", price: "8,00 €" },
            { num: "213", name: "Sun of the East", allergens: "c", desc: "Mangosaft, Vanillesirup, Kokossirup, Erdbeersirup, Kokosmilch, Limettensaft.", price: "9,00 €" },
            { num: "214", name: "Coconut Kiss", allergens: "7", desc: "Kirschsaft, Ananassaft, Kokossirup, Sahne, Kokosmilch.", price: "9,00 €" },
            { num: "215", name: "Virgin Colada", allergens: "7", desc: "Ananassaft, Kokosmilch, Sahne, Kokossirup, Limettensaft.", price: "9,00 €" },
            { num: "216", name: "Virgin Sunrise", allergens: "c", desc: "Orangensaft, Ananassaft, Zitronensaft, Grenadine.", price: "9,00 €" },
            { num: "217", name: "Virgin Margarita", desc: "Orangensaft, Zuckersirup, Limettensaft.", price: "9,00 €" },
            { num: "218", name: "Fruit Punch", allergens: "c", desc: "Maracujasaft, Ananassaft, Orangensaft, Grenadine, Zitronensaft.", price: "9,00 €" }
          ]
        },
        {
          title: "Karaffen · Frisches Aromawasser",
          note: "Mit frischen Früchten und Kräutern · still oder spritzig.",
          items: [
            { num: "220", name: "Wasser", price: "3,00 €" },
            {
              num: "221",
              name: "Limette & Minze",
              variants: [
                { label: "0,5 L", price: "5,00 €" },
                { label: "1,0 L", price: "8,50 €" }
              ]
            },
            {
              num: "222",
              name: "Orange",
              variants: [
                { label: "0,5 L", price: "5,00 €" },
                { label: "1,0 L", price: "8,50 €" }
              ]
            },
            {
              num: "223",
              name: "Zitronengras",
              variants: [
                { label: "0,5 L", price: "5,00 €" },
                { label: "1,0 L", price: "8,50 €" }
              ]
            },
            {
              num: "224",
              name: "Gurke & Minze",
              variants: [
                { label: "0,5 L", price: "5,00 €" },
                { label: "1,0 L", price: "8,50 €" }
              ]
            }
          ]
        },
        {
          title: "Erfrischungen · Alkoholfreie Getränke",
          items: [
            {
              num: "301",
              name: "Coca-Cola",
              allergens: "a,c",
              variants: [
                { label: "0,2 L", price: "3,20 €" },
                { label: "0,4 L", price: "4,50 €" }
              ]
            },
            {
              num: "302",
              name: "Coca-Cola Light",
              allergens: "a,c,g,h",
              variants: [
                { label: "0,2 L", price: "3,20 €" },
                { label: "0,4 L", price: "4,50 €" }
              ]
            },
            {
              num: "303",
              name: "Fanta",
              allergens: "c,g",
              variants: [
                { label: "0,2 L", price: "3,20 €" },
                { label: "0,4 L", price: "4,50 €" }
              ]
            },
            {
              num: "304",
              name: "Sprite",
              allergens: "g",
              variants: [
                { label: "0,2 L", price: "3,20 €" },
                { label: "0,4 L", price: "4,50 €" }
              ]
            },
            { num: "305", name: "Ginger Ale (0,2 L)", allergens: "c", price: "3,50 €" },
            { num: "306", name: "Wild Berry (0,2 L)", allergens: "c", price: "3,50 €" }
          ]
        },
        {
          title: "Säfte · 0,4 L",
          items: [
            { num: "311", name: "Orangensaft", price: "4,50 €" },
            { num: "312", name: "Ananassaft", price: "4,50 €" },
            { num: "313", name: "Erdbeersaft", price: "4,50 €" },
            { num: "314", name: "Maracujasaft", price: "4,50 €" },
            { num: "315", name: "Pfirsichsaft", price: "4,50 €" },
            { num: "316", name: "Mangosaft", price: "4,50 €" },
            { num: "317", name: "Apfelsaft", price: "4,50 €" }
          ]
        },
        {
          title: "Bier",
          items: [
            {
              num: "401",
              name: "Kulmbacher Edelherb Pils",
              allergens: "1",
              desc: "Vom Fass.",
              variants: [
                { label: "0,3 L", price: "3,90 €" },
                { label: "0,4 L", price: "4,50 €" }
              ]
            },
            { num: "402", name: "Kapuziner Hefeweizen Hell", allergens: "1", desc: "Vom Fass · 0,5 L.", price: "4,90 €" },
            { num: "403", name: "Mönchshof Original Helles", allergens: "1", desc: "Flasche · 0,5 L.", price: "4,90 €" },
            { num: "404", name: "Kapuziner Hefeweizen alkoholfrei", allergens: "1", desc: "Flasche · 0,5 L.", price: "4,90 €" },
            { num: "405", name: "Asahi Super Dry", allergens: "1", desc: "Flasche · 0,33 L.", price: "4,90 €" },
            { num: "406", name: "Singha", allergens: "1", desc: "Flasche · 0,33 L.", price: "4,50 €" }
          ]
        },
        {
          title: "Wein · 0,2 L & Rotwein",
          items: [
            { num: "411", name: "Silvaner trocken", allergens: "12", price: "5,90 €" },
            { num: "412", name: "Bacchus halbtrocken", allergens: "12", price: "5,90 €" },
            { num: "413", name: "Pinot Grigio trocken", allergens: "12", price: "5,90 €" },
            { num: "414", name: "Silvaner trocken (rot)", allergens: "12", price: "6,50 €" },
            { num: "415", name: "Lambrusco lieblich", allergens: "12", price: "5,90 €" },
            {
              num: "416",
              name: "Weinschorle weiß",
              allergens: "12",
              variants: [
                { label: "0,2 L", price: "4,50 €" },
                { label: "0,4 L", price: "7,50 €" }
              ]
            }
          ]
        },
        {
          title: "Cocktails · je 9,00 €",
          items: [
            { num: "501", name: "Sex on the Beach", allergens: "c", desc: "Wodka, Pfirsichlikör, Ananassaft, Orangensaft, Zitronensaft, Grenadinesirup.", price: "9,00 €" },
            { num: "502", name: "Piña Colada", allergens: "7", desc: "Ananassaft, Kokossirup, Kokoslikör, weißer Rum, Limettensaft, Sahne.", price: "9,00 €" },
            { num: "503", name: "Cosmopolitan", desc: "Limettensaft, Cranberrysaft, Absolut Vodka, Cointreau.", price: "9,00 €" },
            { num: "504", name: "Mojito", desc: "Weißer Rum, Limettensaft, Zuckersirup, Sodawasser, Minze, Rohrzucker.", price: "9,00 €" },
            { num: "505", name: "Caipirinha", desc: "Cachaça, Limette, brauner Zucker, Limettensaft.", price: "9,00 €" },
            { num: "506", name: "Cuba Libre", allergens: "a,c", desc: "Weißer Rum, Cola, Limette, Limettensaft.", price: "9,00 €" },
            { num: "507", name: "Margarita", desc: "Tequila, Cointreau, Zuckersirup, Limettensaft.", price: "9,00 €" },
            { num: "508", name: "Hugo", allergens: "12", desc: "Prosecco, Holunderblütensirup, Minze, Sodawasser.", price: "9,00 €" },
            { num: "509", name: "Aperol Spritz", allergens: "c,12", desc: "Aperol, Prosecco, Sodawasser.", price: "9,00 €" },
            { num: "510", name: "Lillet Wild Berry", allergens: "c,12", desc: "Lillet, Wild Berry, gemischte Beeren, Rohrzucker.", price: "9,00 €" },
            { num: "511", name: "Moscow Mule", desc: "Wodka, Ginger Beer, Zitronensaft, Gurke.", price: "9,00 €" },
            { num: "512", name: "Tequila Sunrise", allergens: "c", desc: "Tequila, Orangensaft, Grenadine.", price: "9,00 €" }
          ]
        },
        {
          title: "Premium-Cocktails · je 11,00 €",
          items: [
            { num: "513", name: "Planter’s Punch", allergens: "c", desc: "Orangensaft, weißer Rum, brauner Rum, Zitronensaft, Zuckersirup.", price: "11,00 €" },
            { num: "514", name: "Sun of the East Special", allergens: "c", desc: "Ananassaft, Pfirsichsaft, Maracujasaft, Wodka, weißer Rum, Passoã, Maracujasirup, Grenadine.", price: "11,00 €" },
            { num: "515", name: "Mai Tai", allergens: "8,c", desc: "Brauner Rum, Zuckersirup, Cointreau, Mandelsirup.", price: "11,00 €" },
            { num: "516", name: "Long Island Iced Tea", allergens: "a,c", desc: "Tequila, Wodka, Triple Sec, Gin, Zitronensaft, Zuckersirup, Cola.", price: "11,00 €" }
          ]
        },
        {
          title: "Longdrinks",
          items: [
            { num: "601", name: "Bombay London Dry", price: "7,00 €" },
            { num: "602", name: "Bombay Sapphire", price: "7,50 €" },
            { num: "603", name: "Gin Berry", allergens: "c", desc: "Gemischte Beeren, Limette, Gin, Wild Berry.", price: "8,50 €" },
            { num: "604", name: "Gin Tonic", allergens: "b", desc: "Limette, Gin, Tonic Water.", price: "8,50 €" },
            { num: "605", name: "Wodka Orange", price: "7,50 €" },
            { num: "606", name: "Wodka Lemon", price: "7,50 €" },
            { num: "607", name: "Wodka Cola", allergens: "a,c", price: "8,00 €" },
            { num: "608", name: "Wodka Fanta", allergens: "c,g", price: "8,00 €" },
            { num: "609", name: "Wodka Sprite", allergens: "g", price: "8,00 €" },
            { num: "610", name: "Wodka Red Bull", allergens: "c,i", price: "8,50 €" },
            { num: "611", name: "Rum Apfelsaft", price: "7,50 €" },
            { num: "612", name: "Rum Maracuja", price: "7,50 €" },
            { num: "613", name: "Rum Cola", allergens: "a,c", price: "8,00 €" },
            { num: "614", name: "Rum Ginger Ale", allergens: "c", price: "8,00 €" },
            { num: "615", name: "Whisky Cola", allergens: "a,c", price: "8,00 €" },
            { num: "616", name: "Whisky Soda", price: "8,00 €" },
            { num: "617", name: "Aperol Sour", allergens: "c", price: "auf Anfrage" },
            { num: "618", name: "Aperol Sour Royal", allergens: "c,12", price: "auf Anfrage" },
            { num: "619", name: "Campari Orange", allergens: "c", price: "auf Anfrage" },
            { num: "620", name: "Campari Soda", allergens: "c", price: "auf Anfrage" }
          ]
        },
        {
          title: "Spirituosen & Shots",
          items: [
            { num: "701", name: "Bombay London Dry Gin", price: "5,00 €" },
            { num: "702", name: "Bombay Sapphire Gin", price: "5,00 €" },
            { num: "703", name: "Three Sixty Vodka", price: "5,00 €" },
            { num: "704", name: "Havana Club 3 Años", allergens: "c", price: "5,00 €" },
            { num: "705", name: "Jack Daniel’s", price: "5,00 €" },
            { num: "706", name: "Jim Beam Bourbon", price: "5,00 €" },
            { num: "707", name: "Chivas Regal 12 Jahre", allergens: "c", price: "6,00 €" },
            { num: "708", name: "Hennessy VS", allergens: "c", price: "7,00 €" },
            { num: "709", name: "Baileys Original", allergens: "7,c", price: "5,00 €" },
            { num: "710", name: "Amaretto Disaronno", allergens: "c", price: "5,00 €" },
            { num: "711", name: "Jägermeister", allergens: "c", price: "5,00 €" },
            { num: "712", name: "Ramazzotti Amaro", allergens: "c", price: "5,00 €" },
            { num: "713", name: "Sierra Tequila Silver", price: "5,00 €" }
          ]
        }
      ]
    }
  ]
};

if (typeof window !== "undefined") window.SUN_MENU_DATA = sunMenuData;
if (typeof module !== "undefined" && module.exports) module.exports = sunMenuData;
