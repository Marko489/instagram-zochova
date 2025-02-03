// src\app\(public)\gdpr\page.tsx


// import { Metadata } from "next";
// import dynamic from "next/dynamic";

// export const metadata: Metadata = { title: "GDPR | ZoškaSnap" };

// const GDPRClient = dynamic(() => import("../../../components/GDPRClient"), {
//   ssr: false, // Ensures it's client-side only
// });

// export default function GDPR() {
//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", textAlign: "center", padding: "20px" }}>
//       <div>
//         {/* GDPR Text */}
//         <h1>Súhlas s ochranou osobných údajov (GDPR)</h1>
//         <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
//           Tento dokument vysvetľuje, ako spracovávame a chránime vaše osobné údaje pri používaní našich služieb. Vaše osobné údaje, ako meno, e-mailová adresa a ďalšie informácie, budú spracovávané v súlade s požiadavkami GDPR (Nariadenie o ochrane osobných údajov). 
//           Týmto súhlasíte so spracovaním týchto údajov na účely poskytovania našich služieb, zlepšovania používateľskej skúsenosti a zasielania relevantných informácií.
//         </p>
        
//         {/* Client-side back button */}
//         <GDPRClient />
//       </div>
//     </div>
//   );
// }




// src/app/(public)/gdpr/page.tsx

import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = { title: "GDPR | ZoškaSnap" };

const GDPRClient = dynamic(() => import("../../../components/GDPRClient"), {
  ssr: false, // Ensures it's client-side only
});

export default function GDPR() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        overflow: "hidden", // Ensure the scrollbar is hidden
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          textAlign: "left",
          maxHeight: "90vh", // Allow scrolling within the container
          overflowY: "auto", // Enable vertical scrolling
          padding: "20px", // Add some padding for better readability
          borderRadius: "30px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for a subtle effect
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for Internet Explorer
        }}
      >
        <h1 style={{ textAlign: "center" }}>Súhlas s ochranou osobných údajov (GDPR)</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          Tento dokument vysvetľuje, ako spracovávame a chránime vaše osobné údaje pri používaní našich služieb. Vaše osobné údaje, ako meno, e-mailová adresa a ďalšie informácie, budú spracovávané v súlade s požiadavkami GDPR (Nariadenie o ochrane osobných údajov).
          Týmto súhlasíte so spracovaním týchto údajov na účely poskytovania našich služieb, zlepšovania používateľskej skúsenosti a zasielania relevantných informácií.
        </p>
        
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>1. Spracovanie osobných údajov:</strong>
            <ul>
              <li>Zhromažďujeme osobné údaje, ako meno, e-mail, telefónne číslo a ďalšie informácie.</li>
              <li>Spracovávame tieto údaje na základe vašich súhlasov alebo zmluvného vzťahu.</li>
              <li>Osobné údaje nebudú zdieľané bez vášho súhlasu.</li>
            </ul>
          </li>
          <li>
            <strong>2. Účel spracovania údajov:</strong>
            <ul>
              <li>Vaše údaje spracovávame na účely poskytovania našich služieb.</li>
              <li>Využívame údaje na zlepšenie našich služieb a používateľskej skúsenosti.</li>
              <li>Vaše údaje môžeme použiť na marketingové účely s vaším súhlasom.</li>
            </ul>
          </li>
          <li>
            <strong>3. Ochrana údajov:</strong>
            <ul>
              <li>Vaše osobné údaje sú chránené šifrovaním a prísnymi bezpečnostnými opatreniami.</li>
              <li>Máte právo na prístup k svojim údajom a ich úpravu.</li>
              <li>Vaše údaje uchovávame len po dobu, ktorá je nevyhnutná na poskytovanie našich služieb.</li>
            </ul>
          </li>
          <li>
            <strong>4. Práva používateľa:</strong>
            <ul>
              <li>Máte právo na prístup k svojim osobným údajom.</li>
              <li>Máte právo na opravu alebo vymazanie vašich osobných údajov.</li>
              <li>Máte právo odvolať súhlas so spracovaním údajov kedykoľvek.</li>
            </ul>
          </li>
          <li>
            <strong>5. Kontakt na ochranu údajov:</strong>
            <ul>
              <li>Pre otázky ohľadom ochrany osobných údajov nás kontaktujte na e-mailovej adrese.</li>
              <li>Vaše obavy a otázky budú spracované v čo najkratšom čase.</li>
              <li>Rovnako máte právo podať sťažnosť na príslušný úrad na ochranu údajov.</li>
            </ul>
          </li>
        </ul>

        {/* Client-side back button */}
        <GDPRClient />
      </div>
    </div>
  );
}
