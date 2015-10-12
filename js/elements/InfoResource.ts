class InfoResource{

    public productInfo():string{
        return "Gib das gew�nschte Produkt ein und dr�cke auf Suchen. Wenn du alle Produkte finden willst, " +
        "dann lasse das Feld frei und suche direkt. Alternativ kannst du auf 'Erweiterte Suche' dr�cken um weitere Suchoptionen zu erhalten " +
        "z.B. um Produkte gezielt nach Kategorien zu suchen oder um dir alle Kategorien mit den Produkten anzeigen zu lassen.";
    }

    public cartInfo(): string{
        return "Wenn du bezahlen m�chtest, generiere dir an der Kasse im FABLAB einen QR Code " +
            "und klicke hier auf den \"Zur Kasse\"-Button. Nun musst du den QR Code abtippen, auf \"Absenden\" klicken " +
            "und anschlie�end bequem im FABLAB bezahlen.";
    }

    public reservationInfo(): string{
        return "W�hle eine Maschine aus dem Dropdown Men� aus, " +
            "f�lle anschlie�end die drei gegebenen Felder entsprechend aus und trage dich per Klick in die Warteliste ein. " +
            "Du sieht anschlie�end die aktuelle Warteschlange und deine Position. Wenn du doch nicht mehr warten willst oder keine Zeit mehr hast," +
            " trage dich bitte wieder aus indem du auf das kleine X in deiner Zeile klickst.";
    }

    public aboutInfo():string{
        return "W�hlen Sie aus, was Sie melden wollen. Danach k�nnen die Formularfelder ausgef�llt werden."
    }
}
