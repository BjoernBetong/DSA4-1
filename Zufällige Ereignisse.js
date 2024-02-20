//Skript für das Auswürfeln von zufälligen Ereignissen zwischen den Abenteuern

main();
async function main() {

	
	//Abrufen des hinterlegten Würfelsystems
    const rollMode = game.settings.get('core', 'rollMode');

//###############################################################################################################################################################################################################################################

    //allgemeine Dialogoptionen
		const hr = "<hr>";
		const divFlexStart = "<div style='display:flex'><span style='flex:1'>";
		const divFlexEnd = "</span></div>";
		const divInputNumber = "type='number' style='width:50px;float:right' value='";
		const divInputBox = "type='checkbox' style='width:70px;float:right' ";
		const divInputUnchecked = "/>";
		const divInputChecked = "checked />";
	
//###############################################################################################################################################################################################################################################    

//Dialoge
	//Beschwörung des Elementars
	headerDialog = "<h2><b><i>Zufällige Ereignisse</b></i></h2>";
    inputDialog = headerDialog;
//    inputDialog += divFlexStart + "Anzahl der Ereignisse: <input id='inputTime'" + divInputNumber  + "1'/>" + divFlexEnd;
		
//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Zufällige Ereignisse",
        content: inputDialog + hr,
        buttons: {
            close: {
                icon: '<i class="fas fa-times"></i>', label: "Schließen"
            }, 
            accept: {
                icon: '<i class="fas fa-check"></i>', label: "Würfeln", callback: htmlCallback
            }  
        },
		default: "accept",
        render: () => console.log(),
        close: () => console.log()
    }).render(true);
	
    async function htmlCallback(html){
		
		//Input Boxes
//		const Time = Number(html.find("#inputTime")[0]?.value || 0);		


		//Roll the dice
        randomEncounterDice = "1d100";
		randomEncounterRoll = new Roll(randomEncounterDice).roll({async: true});
		randomEncounterRoll.then(roll =>{
			let randomEncounterResult = roll.total;


if(randomEncounterResult == 1 || randomEncounterResult == 2 || randomEncounterResult == 3){
	Encounter = "Ein Held wird in ein schreckliches Verbrechen verwickelt. Mit einer erfolgreichen Probe auf Rechtskunde kann eine Anschuldigung verhindert werden. Andernfalls wird er eingesperrt. Die Kaution beträgt SO x 10 Dukaten.";
}if(randomEncounterResult == 4 || randomEncounterResult == 5 || randomEncounterResult == 6){
	Encounter = "Die Habseligkeiten eines kürzlich verstorbenen Nachbarn werden versteigert, darunter ein staubiges, altes Buch unbekannter Herkunft. Wenn ein Held den geforderten Preis von 10 Dukaten zahlen kann, gehört das Buch ihm! Das Buch kann wahlweise einen neuen Zauberspruch, ein alchmimistisches Rezept oder eine spez. Erfahrung auf ein Wissenstalent enthalten.";
}if(randomEncounterResult == 7 || randomEncounterResult == 8 || randomEncounterResult == 9 || randomEncounterResult == 10){
	Encounter = "Ein Freund, Familienmitglied oder Verbündeter wendet sich gegen einen Helden, und die Auswirkungen werden das nächste Abenteuer beeinflussen. Wenn der Held keine Freunde, Familie oder Verbündeten hat, ist die Zeit zwischen den Abenteuern zwar friedlich und ereignislos, aber auch etwas langweilig.";
}if(randomEncounterResult == 11 || randomEncounterResult == 12 || randomEncounterResult == 13 || randomEncounterResult == 14){
	Encounter = "Ein fauler Stallknecht hat die Stalltür nicht abgeschlossen, und das Reittier eines Helden ist ausgebüxt! Mit einer erfolgreichen Abrichten-Probe kehrt das Tier zurück. Ansonsten ist das Ross verschwunden und wird wahrscheinlich nie wieder gesehen. Wenn der Held kein Reittier hat, hat der Held sich eine schmerzhafte neue Blase an dem Fuß zugezogen und startet das nächste Abenteuer mit 1W6 LeP weniger.";
}if(randomEncounterResult == 15 || randomEncounterResult == 16 || randomEncounterResult == 17 || randomEncounterResult == 18){
	Encounter = "Ein kleiner Streit in der Nachbarschaft hat sich zu einer Fehde entwickelt – der Meister entscheidet, wen ein Held beleidigt hat und wie. Diese Person wird keine Gelegenheit für kleine Rache verpassen, wahrscheinlich während des nächsten Abenteuers.";
}if(randomEncounterResult == 19 || randomEncounterResult == 20 || randomEncounterResult == 21){
	Encounter = "Die Wache geht hart gegen Kriminalität vor und illegale Geschäfte bringen kein Einkommen.";
}if(randomEncounterResult == 22 || randomEncounterResult == 23 || randomEncounterResult == 24 || randomEncounterResult == 25){
	Encounter = "Ein unerwarteter Besuch des Steuereintreibers (in Begleitung mehrerer Soldaten) fegt durch die örtliche Siedlung. Alle Helden verlieren 30 % seines Einkommens.";
}if(randomEncounterResult == 26 || randomEncounterResult == 27 || randomEncounterResult == 28 || randomEncounterResult == 29){
	Encounter = "Zum Entsetzen der Händler plagt eine Serie von gefälschten Münzen die Gegend. Ein Fünftel aller Münzen ist betroffen. Die Helden verliert 20 % ihres Einkommens.";
}if(randomEncounterResult == 30 || randomEncounterResult == 31 || randomEncounterResult == 32 || randomEncounterResult == 33){
	Encounter = "Das Geschäft läuft besonders gut für Menschen, die im Flusshandel tätig sind. Alle Seeleute erhalten zusätzlich 50 % Einkommen.";
}if(randomEncounterResult == 34 || randomEncounterResult == 35 || randomEncounterResult == 36){
	Encounter = "Den Helden wird ein kryptisches Omen in einem Traum, von einer Hexe oder eines Scharlatans, den sie auf der Straße treffen, gegeben. Während des nächsten Abenteuers darf jeder Held eine misslungene Probe wiederholen.";
}if(randomEncounterResult == 37 || randomEncounterResult == 38 || randomEncounterResult == 39 || randomEncounterResult == 40){
	Encounter = "Eine Feier wird ausgerufen! Der Meister entscheidet, welche Art von Ereignis es ist. Mögliche Optionen sind eine örtliche Hochzeit, eine ergiebige Ernte oder eine öffentliche Hinrichtung! Ein Held war in das Ereignis verwickelt (und seine Folgen) und verliert das Einkommen von 1W6 Tagen.";
}if(randomEncounterResult == 41 || randomEncounterResult == 42 || randomEncounterResult == 43 || randomEncounterResult == 44){
	Encounter = "Besonders schlechtes Wetter zieht auf. Für das nächste Abenteuer steigen die Lebensmittelpreise um 20 % (aufgrund des Verderbens gelagerter Vorräte).";
}if(randomEncounterResult == 45 || randomEncounterResult == 46 || randomEncounterResult == 47 || randomEncounterResult == 48){
	Encounter = "Gute Bedingungen inspirieren die Helden und machen sie erfolgreich. Für kleinere Aufgaben, die sie in der Gegend erledigen erhalten sie 25 AP.";
}if(randomEncounterResult == 49 || randomEncounterResult == 50 || randomEncounterResult == 51 || randomEncounterResult == 52){
	Encounter = "Lebensmittel werden äußerst knapp, und viele Menschen leiden schrecklich. Die Lebensmittelpreise verdoppeln sich in der Gegend für die Dauer des nächsten Abenteuers.";
}if(randomEncounterResult == 53 || randomEncounterResult == 54 || randomEncounterResult == 55 || randomEncounterResult == 56){
	Encounter = "Eine Krankheit (nach Meisterentscheid, WdS. S. 151) grassiert in der Gegend. Alle Helden legen eine KO-Probe ab. Bei Misslingen erkrankt der Held daran zu Beginn des nächsten Abenteuers.";
}if(randomEncounterResult == 57 || randomEncounterResult == 58 || randomEncounterResult == 59 || randomEncounterResult == 60){
	Encounter = "Ein Monster (Meisterentscheid) sorgt für Panik unter den Einheimischen. Die Helden finden gehen keiner Tätigkeit nach, sondern kümmern sich um das Problem. Sie erhalten zusammen 25 D und 25 AP. Es wird anschließend ein Fest zu ihren Ehren abgehalten und sie werden in der Gegend bekannter (SO +1).";
}if(randomEncounterResult == 61 || randomEncounterResult == 62 || randomEncounterResult == 63){
	Encounter = "Einer der Verwandten, Freunde oder Verbündeten deines Charakters stirbt. Es könnte auf natürliche Ursachen, einen Unfall oder den Beginn von etwas Unheilvollem zurückzuführen sein.";
}if(randomEncounterResult == 64 || randomEncounterResult == 65){
	Encounter = "Die Nächte sind besonders dunkel. Alle illegalen Geschäfte erhalten einen Bonus von +20 % auf das Einkommen.";
}if(randomEncounterResult == 66 || randomEncounterResult == 67){
	Encounter = "Die Helden werden um einen wichtigen oder bedeutenden Gefallen gebeten. Sie erhalten kein Einkommen, dafür steigt der SO um 1, sie erhalten 25 AP und 12 Dukaten.";
}if(randomEncounterResult == 68 || randomEncounterResult == 69){
	Encounter = "Soldaten, wohlhabende Händler oder urlaubende Adlige ziehen durch die Gegend, und die Helden, die bereit sind, sich anzubiedern, ernten die Vorteile. Das Einkommen steigt um zusätzlich 50 %.";
}if(randomEncounterResult == 70 || randomEncounterResult == 71){
	Encounter = "Es sind Zeiten wie diese, die die Helden daran erinnern, worum es im Leben wirklich geht: guter Schlaf und feiner Käse. Zu Beginn des nächsten Abenteuers sind die Helden selbstgefällig zufrieden.";
}if(randomEncounterResult == 72 || randomEncounterResult == 73){
	Encounter = "Ein erfahrener, weitgereister Händler, der gerne plaudert, zieht durch. Für den Preis eines Kruges Bier erhalten die Helden einen wichtigen Hinweis für das nächste Abenteuer.";
}if(randomEncounterResult == 74 || randomEncounterResult == 76){
	Encounter = "Ein Tier der Gruppe ist erkrankt; führe eine Probe auf Heilkunde Krankheiten durch. Bei Erfolg erholt sich dein Tier. Wenn nicht, stirbt das bedauernswerte Wesen. Wenn die Gruppe keine Tiere hat, plagen sie unheilvolle Omen, die der Meister entscheiden darf.";
}if(randomEncounterResult == 77 || randomEncounterResult == 78 || randomEncounterResult == 79){
	Encounter = "Ein Held wird ausgeraubt, und verliert sein gesamtes Geld. Wenn der Geldbetrag weniger als 1 Dukate beträgt, stehlen die Diebe auch den wertvollsten Ausrüstungsgegenstand.";
}if(randomEncounterResult == 80 || randomEncounterResult == 81 || randomEncounterResult == 82){
	Encounter = "Das gemeine Volk ist wütend auf die Mächtigen! Helden mit einem SO < 10 erhalten kein Einkommen. Söldner erhalten dafür das Doppelte Einkommen.";
}if(randomEncounterResult == 83 || randomEncounterResult == 84 || randomEncounterResult == 85){
	Encounter = "Ihr wurdet ausgeraubt. Alle Helden verlieren 50 % des Einkommens.";
}if(randomEncounterResult == 86 || randomEncounterResult == 87 || randomEncounterResult == 88){
	Encounter = "Ein Held gerät in das Visier der Praioskirche, die vermutet, dass er sich mit Dämonen, Kultisten oder Schlimmerem auf seinen sogenannten Abenteuern eingelassen hat. Es erfordert eine gelungene Charisma-Probe, den Jäger von deiner Unschuld zu überzeugen. Wenn die Probe nicht gelingt, hat sich der Held einen unversöhnlichen Erzfeind eingehandelt, der in der Zukunft mit Sicherheit für Ärger sorgen wird.";
}if(randomEncounterResult == 89 || randomEncounterResult == 90 || randomEncounterResult == 91){
	Encounter = "Die unregelmäßigen Bewegungen der Gruppe und ihr plötzlicher Reichtum haben Verdacht erregt. Alle Helden verlieren an Ansehen (SO – 1).";
}if(randomEncounterResult == 92 || randomEncounterResult == 93 || randomEncounterResult == 94){
	Encounter = "Wenig Interessantes geschieht, vielleicht hinterlässt es bei dir jedoch einen Appetit für risikoreiche Unternehmungen, der durch Langeweile inspiriert ist!";
}if(randomEncounterResult == 95 || randomEncounterResult == 96 || randomEncounterResult == 97){
	Encounter = "Jemand, dem ihr in der Vergangenheit geholfen habt, hat die Möglichkeit, eure Bemühungen zu erwidern. Die genaue Art der Belohnung sollte zu den vergangenen Taten passen und zu den Nicht-Spieler-Charakteren, die ihr während des Spiels oder in eurer Hintergrundgeschichte unterstützt habt. Die Dankbarkeit kann von einem einzigen hochwertigen Gegenstand bis zu einem Beutel Silber variieren (der zu Beginn des nächsten Abenteuers verfügbar sein wird). Natürlich ist nicht alles Gold, was glänzt, und nicht alle Geschenke sind das, was sie zu sein scheinen…";
}if(randomEncounterResult == 98 || randomEncounterResult == 99 || randomEncounterResult == 100){
	Encounter = "Eine oder mehrere seltene Söldner tauchen in einer nahegelegenen Siedlung auf und suchen nach Arbeit: Die Söldner werden jeden Charakter gerne in ihren kämpferischen Fähigkeiten oder Talenten schulen. Die Helden dürfen ein Kampftalent entweder mit einer spez. Erfahrung (≤ TaW 10) oder mit Lehrmeister steigern.";
}

		

			//Chat Output
            flavor = "<b>Zufällige Ereignisse zwischen den Abenteuern</b>" + hr;
			flavor += Encounter;
				
            roll.toMessage ({
                flavor: flavor,
            },
            {rollMode: CONST.DICE_ROLL_MODES.BLIND}
            );
		});		//Schließen aller Klammer aus "Roll the Dice"
	}			//Schließen der Klammer: async function htmlCallback (html)
}				//Schließen der Klammer: async function main ()