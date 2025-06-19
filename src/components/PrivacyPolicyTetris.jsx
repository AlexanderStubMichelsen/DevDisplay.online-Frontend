import React from 'react';

const PrivacyPolicyTetris = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privatlivspolitik for Tetris</h1>

      <p className="mb-4">Ikrafttrædelsesdato: 17. juni 2025</p>

      <p className="mb-4">
        Tak fordi du bruger <strong>Tetris</strong> (“vi”, “os” eller “vores”). Vi tager dit privatliv alvorligt og ønsker at informere dig om, hvordan vi behandler data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Dataindsamling</h2>
      <p className="mb-4">
        Appen indsamler og gemmer <strong>ikke-følsomme oplysninger</strong> såsom det valgte spillernavn og score, som bruges til visning på en offentlig highscore-liste. Der indsamles ingen e-mails, adgangskoder eller andre identificerbare oplysninger.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Dataanvendelse</h2>
      <p className="mb-4">
        Vi bruger data (spillernavn og score) til at vise en offentlig liste over de højeste scores i spillet. Disse data bruges <strong>udelukkende til dette formål</strong> og deles ikke med tredjeparter til markedsføring eller analyse.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Deling af oplysninger</h2>
      <p className="mb-4">
        Vi bruger <a className="text-blue-600 underline" href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase</a>, en tjeneste leveret af Google, til at gemme og hente highscore-data. Firebase fungerer som en databehandler og overholder <a className="text-blue-600 underline" href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Googles privatlivspolitik</a>.
        <br />
        Vi deler ikke dine data med andre tredjeparter.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Dataopbevaring og sikkerhed</h2>
      <p className="mb-4">
        Data gemmes sikkert via Firebase og opbevares indtil brugeren beder om at få det slettet. Alle forbindelser til databasen er sikret via kryptering.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Børn</h2>
      <p className="mb-4">
        Appen er ikke rettet mod børn under 13 år.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Kontakt</h2>
      <p className="mb-4">
        Hvis du har spørgsmål eller ønsker dine data fjernet, kan du kontakte os på:<br />
        📧 <strong>alexanderstubmichelsen@gmail.com</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Ændringer i politikken</h2>
      <p className="mb-4">
        Vi kan opdatere denne privatlivspolitik fra tid til anden. Alle ændringer vil blive offentliggjort her med en ny ikrafttrædelsesdato.
      </p>
    </div>
  );
};

export default PrivacyPolicyTetris;
