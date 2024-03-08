// Skript für die Nahrungssuche nach WdE


main();
async function main() {
    //Überprüfe, ob ein Held ausgewählt wurde
    if (canvas.tokens.controlled.length === 0 || canvas.tokens.controlled.length > 1) {
        ui.notifications.error("Bitte einen Helden auswählen.");
        return;
    };
    if (game.user.targets.size > 1) {
        ui.notifications.error("Bitte nur einen Helden anvisieren.");
        return;
    };
    
	//gewählter Held
    if(game.user.targets.size === 1){
        targetActor = game.user.targets.values().next().value.actor;
        targetName = targetActor.name;
    }else{
        targetActor = "";
        targetName = "";
	};

	
	//Abrufen des hinterlegten Würfelsystems
    const rollMode = game.settings.get('core', 'rollMode');


//###############################################################################################################################################################################################################################################

	//Name des gewählten Helden
		const tokenName = token.actor.name;

	//Eigenschaften des Helden	
		const courage = token.actor.system.base.basicAttributes.courage.value;																														//Mut				MU
		const cleverness = token.actor.system.base.basicAttributes.cleverness.value;																												//Klugheit			KL
		const intuition = token.actor.system.base.basicAttributes.intuition.value;																													//Intuition			IN
		const charisma = token.actor.system.base.basicAttributes.charisma.value;																													//Charisma			CH
		const dexterity = token.actor.system.base.basicAttributes.dexterity.value;																													//Fingerfertigkeit	FF
		const agility = token.actor.system.base.basicAttributes.agility.value;																														//Gewandheit		GE
		const constitution = token.actor.system.base.basicAttributes.constitution.value;																											//Konstitution		KO
		const strength = token.actor.system.base.basicAttributes.strength.value;																													//Körperkraft		KK
		const magicResistance = token.actor.system.base.combatAttributes.passive.magicResistance.value; 																							//Magieresistenz	MR
		const astralEnergy = token.actor.system.base.resources.astralEnergy.value;																													//Astralenergie		AE

	//Talente des Helden
		const Wildnisleben = token.actor.items.find(item => item.name === "Wildnisleben");																											//Suche nach dem Talent "Wildnisleben"
		const WildnislebenValue = (Wildnisleben === undefined)? isNaN : (Wildnisleben.system.value === null)? 0 : Wildnisleben.system.value;														//Abrufen des TaW des Talents "Wildnisleben"
		const Tierkunde = token.actor.items.find(item => item.name === "Tierkunde");																												//Suche nach dem Talent "Tierkunde"
		const TierkundeValue = (Tierkunde === undefined)? isNaN : (Tierkunde.system.value === null)? 0 : Tierkunde.system.value;																	//Abrufen des TaW des Talents "Tierkunde"
		const Faehrtensuchen = token.actor.items.find(item => item.name === "Fährtensuchen");																										//Suche nach dem Talent "Fährtensuchen"
		const FaehrtensuchenValue = (Faehrtensuchen === undefined)? isNaN : (Faehrtensuchen.system.value === null)? 0 : Faehrtensuchen.system.value;												//Abrufen des TaW des Talents "Fährtensuchen"
		const Schleichen = token.actor.items.find(item => item.name === "Schleichen");																												//Suche nach dem Talent "Schleichen"
		const SchleichenValue = (Schleichen === undefined)? isNaN : (Schleichen.system.value === null)? 0 : Schleichen.system.value;																//Abrufen des TaW des Talents "Schleichen"
		const Reiten = token.actor.items.find(item => item.name === "Reiten");																														//Suche nach dem Talent "Reiten"
		const ReitenValue = (Reiten === undefined)? isNaN : (Reiten.system.value === null)? 0 : Reiten.system.value;																								//Abrufen des TaW des Talents "Reiten"
		const Fischen = token.actor.items.find(item => item.name === "Fischen/Angeln");																												//Suche nach dem Talent "Fischen/Angeln"
		const FischenValue = (Fischen === undefined)? isNaN : (Fischen.system.value === null)? 0 : Fischen.system.value;																			//Abrufen des TaW des Talents "Fischen/Angeln"
		const Selbstbeherrschung = token.actor.items.find(item => item.name === "Selbstbeherrschung");																								//Suche nach dem Talent "Selbstbeherrschung"
		const SelbstbeherrschungValue = (Selbstbeherrschung === undefined)? isNaN : (Selbstbeherrschung.system.value === null)? 0 : Selbstbeherrschung.system.value;								//Abrufen des TaW des Talents "Selbstbeherrschung"
		const Fallenstellen = token.actor.items.find(item => item.name === "Fallenstellen");																										//Suche nach dem Talent "Fallenstellen"
		const FallenstellenValue = (Fallenstellen === undefined)? isNaN : (Fallenstellen.system.value === null)? 0 : Fallenstellen.system.value;													//Abrufen des TaW des Talents "Fallenstellen"
		const Sinnenschaerfe = token.actor.items.find(item => item.name === "Sinnenschärfe");																										//Suche nach dem Talent "Sinnenschärfe"
		const SinnenschaerfeValue = (Sinnenschaerfe === undefined)? isNaN : (Sinnenschaerfe.system.value === null)? 0 : Sinnenschaerfe.system.value;												//Abrufen des TaW des Talents "Sinnenschärfe"
		const Pflanzenkunde = token.actor.items.find(item => item.name === "Pflanzenkunde");																										//Suche nach dem Talent "Pflanzenkunde"
		const PflanzenkundeValue = (Pflanzenkunde === undefined)? isNaN : (Pflanzenkunde.system.value === null)? 0 : Pflanzenkunde.system.value;													//Abrufen des TaW des Talents "Pflanzenkunde"

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
	//Jagen und Sammeln von Nahrung (An/Fi/He/Na/Pi/Sp)
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br>geht auf die Jagd oder sammelt Nahrung" + "</h2>";
    inputDialog = headerDialog;
	    inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectSkill">Talent:</label>
                 <select name="SelectSkill" id="SelectSkill" style="float:right">
					<option value="99">--------------Talent auswählen--------------</option>
					<option value="2">Ansitzjagd (An)</option>
					<option value="3">Fischen/Angeln (Fi)</option>
                    <option value="1">Hetzjagd (He)</option> 
					<option value="7">Kräuter suchen (Kr)</option>
					<option value="5">Nahrung sammeln (Na)</option>
                    <option value="0">Pirschjagd (Pi)</option>
					<option value="4">Speerfischen (Sp)</option>
					<option value="6">Tierfallen aufstellen (Ti)</option>
					</select>
            </form>
        `+ divFlexEnd
	    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectWeapon">verwendete Waffe:</label>
                 <select name="SelectWeapon" id="SelectWeapon" style="float:right">
 					<option value="99">-------------------------Waffe auswählen-------------------------</option>
					<option value="25">keine                                       (-/Fi/-/Kr/Na/-/-/Ti)</option>
					<option value="99">----------------------------Armbrüste----------------------------</option>
					<option value="17">Arbalette, Balläster                          (An/-/-/-/-/Pi/-/-)</option>
					<option value="23">Arbalone                                      (An/-/-/-/-/Pi/-/-)</option>
                    <option value="12">Balestra, Leichte Armbrust                   (An/-/He/-/-/Pi/-/-)</option>
                    <option value="4">Balestrina                                    (An/-/He/-/-/Pi/-/-)</option>
                    <option value="10">Eisenwalder                                  (An/-/He/-/-/Pi/-/-)</option>
					<option value="21">Windenarmbrust                                (An/-/-/-/-/Pi/-/-)</option>
					<option value="99">-----------------------------Blasrohr----------------------------</option>
                    <option value="8">Blasrohr                                      (An/-/He/-/-/Pi/-/-)</option>
					<option value="99">-------------------------------Bögen-----------------------------</option>
					<option value="24">Elfenbogen                                   (An/-/He/-/-/Pi/-/-)</option>
					<option value="19">Orkischer Reiterbogen                        (An/-/He/-/-/Pi/-/-)</option>
					<option value="16">Kompositbogen                                (An/-/He/-/-/Pi/-/-)</option>
					<option value="20">Kriegsbogen                                  (An/-/He/-/-/Pi/-/-)</option>
                    <option value="13">Kurzbogen                                    (An/-/He/-/-/Pi/-/-)</option>
					<option value="22">Langbogen                                     (An/-/-/-/-/Pi/-/-)</option>
					<option value="99">------------------------------Diskus-----------------------------</option>
                    <option value="15">Diskus, Jagddiskus, Kampfdiskus               (An/-/-/-/-/Pi/-/-)</option>
					<option value="99">----------------------------Schleudern---------------------------</option>
					<option value="6">Fledermaus                                     (An/-/-/-/-/Pi/-/-)</option>
                    <option value="11">Schleuder                                    (An/-/He/-/-/Pi/-/-)</option>
					<option value="99">----------------------------Wurfbeile----------------------------</option>
					<option value="3">Schneidzahn                                    (An/-/-/-/-/Pi/-/-)</option>
                    <option value="2">Wurfbeil                                       (An/-/-/-/-/Pi/-/-)</option>
					<option value="7">Wurfkeule                                      (An/-/-/-/-/Pi/-/-)</option>
					<option value="99">------------------------Wurfmesser/dolche------------------------</option>
                    <option value="0">Borndorn, Wurfdolch, Wurfmesser                    (An/-/-/-/Pi/-)</option>
                    <option value="1">Wurfscheibe                                    (An/-/-/-/-/Pi/-/-)</option>
					<option value="99">----------------------------Wurfspeere---------------------------</option>
                    <option value="27">angespitzter Stock                             (-/-/-/-/-/-/Sp/-)</option>
                    <option value="9">Dschadra, Holzspeer, Speer, Wurfspeere       (An/-/He/-/-/Pi/Sp/-)</option>
					<option value="5">Efferdbart                                   (An/-/He/-/-/Pi/Sp/-)</option>
                    <option value="26">Fischspeer                                     (-/-/-/-/-/-/Sp/-)</option>
					<option value="18">Speerschleuder                                (An/-/-/-/-/Pi/-/-)</option>
                    <option value="14">Stabschleuder                                 (An/-/-/-/-/Pi/-/-)</option>
					</select>
            </form>
        `+ divFlexEnd
	    inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectRegion">Region:</label>
                 <select name="SelectRegion" id="SelectRegion" style="float:right">
					<option value="99">--------------Region auswählen--------------</option>
					<option value="99">------------------Wälder------------------</option>
                    <option value="5">Dschungel</option>
					<option value="7">Dschungel (Maraskan)</option>
                    <option value="6">Regenwald</option>
                    <option value="3">Dichter Wald</option>
					<option value="0">Lichter Wald</option>
					<option value="99">--------------offene Flächen--------------</option>
                    <option value="1">Grasland und Heide</option>
                    <option value="2">Savanne und Steppe</option>
                    <option value="9">Tundra</option>
					<option value="99">---------------Bergregionen---------------</option>
                    <option value="4">Gebirge</option>
                    <option value="11">Hochgebirge</option>
					<option value="99">--------------Feuchtgebiete---------------</option>
                    <option value="10">nördliche Sümpfe und Moore</option>
                    <option value="8">südliche Sümpfe und Marschen</option>
					<option value="99">--------------Extremgebiete---------------</option>
					<option value="13">Ewiges Eis</option>
                    <option value="12">Wüste</option>
					</select>
            </form>
        `+ divFlexEnd
			    inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectWind">Wind:</label>
                 <select name="SelectWind" id="SelectWind" style="float:right">
                    <option value="0">kein Wind</option>
                    <option value="1">steife Brise</option>
                    <option value="2">starker Wind</option>
                    <option value="3">Sturm</option>
					</select>
            </form>
        `+ divFlexEnd
		inputDialog += divFlexStart + `
            <label for="checkFleisch">nur schmackhaftes Fleisch</label><input type="checkbox" id="checkFleisch" name="checkFleisch" style="float:right">
        `+ divFlexEnd + hr;
		inputDialog += "<b>Sonderfertigkeiten</b>";
		inputDialog += divFlexStart + `
            <label for="checkpGK">SF <i>passende Geländekunde</i></label><input type="checkbox" id="checkpGK" name="checkpGK" style="float:right">
        `+ divFlexEnd;
		inputDialog += divFlexStart + `
            <label for="checkaeGK">SF <i>ähnliche Geländekunde</i></label><input type="checkbox" id="checkaeGK" name="checkaeGK" style="float:right">
        `+ divFlexEnd;
		inputDialog += divFlexStart + `
            <label for="checkpOK">SF <i>passende Ortskenntnis</i></label><input type="checkbox" id="checkpOK" name="checkpOK" style="float:right">
        `+ divFlexEnd + hr;
		inputDialog += "<b>Sonderfertigkeiten (</b>(An/-/He/-/-/Pi/Sp/-)";
		inputDialog += divFlexStart + `
            <label for="checkSharp">SF <i>Scharfschütze</i></label><input type="checkbox" id="checkSharp" name="checkSharp" style="float:right">
        `+ divFlexEnd;
		inputDialog += divFlexStart + `
            <label for="checkMaster">SF <i>Meisterschütze</i></label><input type="checkbox" id="checkMaster" name="checkMaster" style="float:right">
        `+ divFlexEnd + hr;
		inputDialog += "<b>weitere Modifikationen </b>(Nahrung sammeln)";
		inputDialog += divFlexStart + "zusätzliche Zeit zum Sammeln [h] <input id='addTime'" + divInputNumber  + "0'/>" + divFlexEnd + hr;
		inputDialog += "<b>weitere Modifikationen </b>(Kräuter suchen)";
					    inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectKraut">Art der Kräuter:</label>
                 <select name="SelectKraut" id="SelectKraut" style="float:right">
					<option value="0">beliebig</option>
                    <option value="1">Heilmitteln</option>
                    <option value="2">Würzkräuter</option>
                    <option value="3">Konservierungsmittel</option>
					</select>
            </form>
        `+ divFlexEnd
		inputDialog += divFlexStart + `
            <label for="checkKraut"><i>eine weitere Stunde sammeln</i></label><input type="checkbox" id="checkKraut" name="checkKraut" style="float:right">
        `+ divFlexEnd;
		
//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Talentprobe",
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
		const TalentInput = Number(html.find("#SelectSkill")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const WeaponInput = Number(html.find("#SelectWeapon")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const RegionInput = Number(html.find("#SelectRegion")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const WindInput = Number(html.find("#SelectWind")[0]?.value || 0);				//Auswahl eines Wertes für das Dropdown-Menü
		const KrautInput = Number(html.find("#SelectKraut")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü

		const addTimeInput = Number(html.find("#addTime")[0]?.value || 0);				//zusätzliche Zeit zum Nahrung sammeln
		
		//Checkboxes
		const checkFleischInput = html.find("#checkFleisch")[0].checked;				//Wie soll die Qulität des Fleischs sein?
				checkFleischModraw = (checkFleischInput === true)? 3 : 0;				//Zuweisen eines Wertes für aktivierte Checkbox
		const checkSharpInput = html.find("#checkSharp")[0].checked;					//Sonderfertigkeit: Scharfschütze
				checkSharpModraw = (checkSharpInput === true)? -3 : 0;					//Zuweisen eines Wertes für aktivierte Checkbox
		const checkMasterInput = html.find("#checkMaster")[0].checked;					//Sonderfertigkeit: Meisterschütze
				checkMasterModraw = (checkMasterInput === true)? -4 : 0;				//Zuweisen eines Wertes für aktivierte Checkbox
		const checkpGKInput = html.find("#checkpGK")[0].checked;						//Sonderfertigkeit: passende Geländekunde
				checkpGKModraw = (checkpGKInput === true)? -3 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const checkaeGKInput = html.find("#checkaeGK")[0].checked;						//Sonderfertigkeit: ähnliche Geländekunde
				checkaeGKModraw = (checkaeGKInput === true)? -1 : 0;					//Zuweisen eines Wertes für aktivierte Checkbox
		const checkpOKInput = html.find("#checkpOK")[0].checked;						//Sonderfertigkeit: passende Ortskenntnis
				checkpOKModraw = (checkpOKInput === true)? -1 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const checkKrautInput = html.find("#checkKraut")[0].checked;					//eine weitere Stunde Kräuter suchen
				checkKrautModraw = (checkpOKInput === true)? 1.5 : 0;					//Zuweisen eines Wertes für aktivierte Checkbox

    if (TalentInput === 99) {
        ui.notifications.error("Es wurde kein Talent ausgewählt.");
        return;
    };
    if (WeaponInput === 99) {
        ui.notifications.error("Es wurde keine Waffe ausgewählt.");
        return;
    };
	if (RegionInput === 99) {
        ui.notifications.error("Es wurde keine Region ausgewählt.");
        return;
    };


		switch(KrautInput){
			case 0:
				KrautPrey = " beliebige Kräuter";
				winKraut = "Gefunden wurde eine Grundmenge eines Krauts, dessen Suchschwierigkeit höchstens die Hälfte der TaP* ausmacht. <br>Diese Suchschwierigkeit wird von den TaP* abgezogen und ein weiteres Kraut gewählt. <br>So wird weiter verfahren, bis die TaP* vollständig verbraucht sind.";
				break;
			case 1:
				KrautPrey = " Heilkräuter";
				winKraut = "Die TaP* werden durch die halbe Suchschwierigkeit der Pflanze geteilt. <br>Das aufgerundete Ergebnis entspricht der Anzahl an Grundmengen der gesuchten Pflanze, die gefunden wurden (üblicherweise ist die Grundmenge mindestens eine Anwendung).";
				break;
			case 2:
				KrautPrey = " Würzkräuter";
				winKraut = "Die halben TaP* erleichtern eine folgende Kochen-Probe, höchstens aber um 3 Punkte. Dabei können die TaP* auch auf mehrere Kochen-Proben aufgeteilt werden. Für jeden Tag, der zwischen Ernte und Verbrauch der Würzkräuter vergeht, sinken die noch nicht verbrauchten TaP* um die Hälfte, da die Würzkräuter ihre Frische verlieren.";
				break;
			case 3:
				KrautPrey = " Konservierungsmittel";
				winKraut = "Pro TaP* kann die Haltbarkeit einer Ration von verderblichen Lebensmitteln um einen Tag verlängert werden.";
				break;
		}
				
		switch(WindInput){
			case 0:
				WindModAnsitzHetzPirsch = 0;
				WindModOthers = 0;
				break;
			case 1:
				WindModAnsitzHetzPirsch = 2;
				WindModOthers = 0;
				break;
			case 2:
				WindModAnsitzHetzPirsch = 4;
				WindModOthers = 0;
				break;
			case 3:
				WindModAnsitzHetzPirsch = 6;
				WindModOthers = 0;
				break;
		}	

		switch(WeaponInput){
            case 0:		//Borndorn, Wurfdolch, Wurfmesser
                WeaponModAnsitzPirsch = 10;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfmesser");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
            case 1:		//Wurfscheibe
                WeaponModAnsitzPirsch = 9;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfmesser");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;        
            case 2:		//Wurfbeil
                WeaponModAnsitzPirsch = 8;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfbeile");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 3:		//Schneidzahn
                WeaponModAnsitzPirsch = 7;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfbeile");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 4:		//Balestrina 
                WeaponModAnsitzPirsch = 6;
				WeaponModHetz = 8;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Armbrust");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 5:		//Efferdbart
                WeaponModAnsitzPirsch = 6;
                WeaponModHetz = 10;
				WeaponModSpeer = -3;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfspeere");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				meleeTaW = token.actor.items.find(item => item.name === "Speere");
				meleeTaWValue = (meleeTaW === undefined)? isNaN : (meleeTaW.system.value === null)? 0 : meleeTaW.system.value;
				rangedORmeleeTaW = Math.max(rangedTaWValue, meleeTaWValue);
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				SpeerfischenValue = Math.round((WildnislebenValue + TierkundeValue + SelbstbeherrschungValue + rangedORmeleeTaW)/4)
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 6:		//Fledermaus
                WeaponModAnsitzPirsch = 6;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Schleuder");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 7:		//Wurfkeule
                WeaponModAnsitzPirsch = 6;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfbeile");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 8:		//Blasrohr
                WeaponModAnsitzPirsch = 4;
				WeaponModHetz = 4;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Blasrohr");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 9:		//Dschadra, Holzspeer, Speer, Wurfspeere
                WeaponModAnsitzPirsch = 4;
				WeaponModHetz = 8;
				WeaponModSpeer = 0;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfspeere");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				meleeTaW = token.actor.items.find(item => item.name === "Speere");
				meleeTaWValue = (meleeTaW === undefined)? isNaN : (meleeTaW.system.value === null)? 0 : meleeTaW.system.value;
				rangedORmeleeTaW = Math.max(rangedTaWValue, meleeTaWValue);
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				SpeerfischenValue = Math.round((WildnislebenValue + TierkundeValue + SelbstbeherrschungValue + rangedORmeleeTaW)/4)
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 10:	//Eisenwalder
                WeaponModAnsitzPirsch = 4;
				WeaponModHetz = 5;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Armbrust");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 11:	//Schleuder
                WeaponModAnsitzPirsch = 4;
				WeaponModHetz = 5;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Schleuder");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 12:	//Balestra, Leichte Armbrust
                WeaponModAnsitzPirsch = 2;
				WeaponModHetz = 6;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Armbrust");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 13:	//Kurzbogen
                WeaponModAnsitzPirsch = 2;
				WeaponModHetz = 2;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Bogen");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 14:	//Stabschleuder
                WeaponModAnsitzPirsch = 2;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfspeere");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 15:	//Diskus, Jagddiskus, Kampfdiskus
                WeaponModAnsitzPirsch = 2;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Schleuder");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 16:	//Kompositbogen
                WeaponModAnsitzPirsch = 1;
				WeaponModHetz = 2;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Bogen");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 17:	//Arbalette, Balläster
                WeaponModAnsitzPirsch = 0;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Armbrust");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 18:	//Speerschleuder
                WeaponModAnsitzPirsch = 0;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfspeere");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 19:	//Orkischer Reiterbogen
                WeaponModAnsitzPirsch = 0;
				WeaponModHetz = 1;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Bogen");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 20:	//Kriegsbogen
                WeaponModAnsitzPirsch = -1;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Bogen");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 21:	//Windenarmbrust
                WeaponModAnsitzPirsch = -2;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Armbrust");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 22:	//Langbogen
                WeaponModAnsitzPirsch = -2;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Bogen");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 23:	//Arbalone
                WeaponModAnsitzPirsch = -3;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Armbrust");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 24:	//Elfenbogen
                WeaponModAnsitzPirsch = -3;
				WeaponModHetz = 1;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Bogen");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 25:	//keine Waffe
                WeaponModAnsitzPirsch = isNaN;
				WeaponModHetz = isNaN;
				WeaponModSpeer = isNaN;
				WeaponModFischenNahrung = 0;
				WeaponModTierfallen = 0;
				rangedTaWValue = isNaN;
				PirschjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				HetzjagdValue = Math.round((WildnislebenValue + TierkundeValue + ReitenValue + ReitenValue + rangedTaWValue)/5);
				AnsitzjagdValue = Math.round((WildnislebenValue + TierkundeValue + FaehrtensuchenValue + SchleichenValue + rangedTaWValue)/5);
				FischenAngelnValue = FischenValue;
				TierfallenValue = Math.round((FallenstellenValue + FallenstellenValue + TierkundeValue + FaehrtensuchenValue + WildnislebenValue)/5);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 26:	//Fischspeer
				WeaponModAnsitzPirsch = isNaN;
				WeaponModHetz = isNaN;
                WeaponModSpeer = -3;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfspeere");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				meleeTaW = token.actor.items.find(item => item.name === "Speere");
				meleeTaWValue = (meleeTaW === undefined)? isNaN : (meleeTaW.system.value === null)? 0 : meleeTaW.system.value;
				rangedORmeleeTaW = Math.max(rangedTaWValue, meleeTaWValue);
				SpeerfischenValue = Math.round((WildnislebenValue + TierkundeValue + SelbstbeherrschungValue + rangedORmeleeTaW)/4);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
			case 27:	//angespitzter Stock
				WeaponModAnsitzPirsch = isNaN;
				WeaponModHetz = isNaN;
                WeaponModSpeer = 3;
				WeaponModFischenNahrung = isNaN;
				WeaponModTierfallen = isNaN;
				rangedTaW = token.actor.items.find(item => item.name === "Wurfspeere");
				rangedTaWValue = (rangedTaW === undefined)? isNaN : (rangedTaW.system.value === null)? 0 : rangedTaW.system.value;
				meleeTaW = token.actor.items.find(item => item.name === "Speere");
				meleeTaWValue = (meleeTaW === undefined)? isNaN : (meleeTaW.system.value === null)? 0 : meleeTaW.system.value;
				rangedORmeleeTaW = Math.max(rangedTaWValue, meleeTaWValue);
				SpeerfischenValue = Math.round((WildnislebenValue + TierkundeValue + SelbstbeherrschungValue + rangedORmeleeTaW)/4);
				NahrungKraeuterValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
				break;
		}

		switch(RegionInput){
			case 0:		
				Region = "Lichter Wald";
				RegionModAnsitzPirsch = -4;
				RegionModHetz = -4;
				RegionModFischen = 0;
				RegionModTierfallen = -4;
				RegionModNahrungKraut = -6;
				break;
			case 1:
				Region = "Grasland und Heide";
				RegionModAnsitzPirsch = -4;
				RegionModHetz = -4;
				RegionModFischen = 0;
				RegionModTierfallen = 0;
				RegionModNahrungKraut = -4;
				break;
			case 2:
				Region = "Savanne und Steppe";
				RegionModAnsitzPirsch = -4;
				RegionModHetz = -4;
				RegionModFischen = 0;
				RegionModTierfallen = 0;
				RegionModNahrungKraut = -2;
				break;
			case 3:
				Region = "Dichter Wald";
				RegionModAnsitzPirsch = -2;
				RegionModHetz = 2;
				RegionModFischen = 0;
				RegionModTierfallen = -4;
				RegionModNahrungKraut = 0;
				break;
			case 4:
				Region = "Gebirge";
				RegionModAnsitzPirsch = -2;
				RegionModHetz = 2;
				RegionModFischen = 2;
				RegionModTierfallen = 0;
				RegionModNahrungKraut = -2;
				break;
			case 5:
				Region = "Dschungel";
				RegionModAnsitzPirsch = 0;
				RegionModHetz = 4;
				RegionModFischen = 0;
				RegionModTierfallen = -4;
				RegionModNahrungKraut = -2;
				break;
			case 6:
				Region = "Regenwald";
				RegionModAnsitzPirsch = 0;
				RegionModHetz = 4;
				RegionModFischen = 0;
				RegionModTierfallen = -4;
				RegionModNahrungKraut = -2;
				break;
			case 7:
				Region = "Dschungel (Maraskan)";
				RegionModAnsitzPirsch = 0;
				RegionModHetz = 6;
				RegionModFischen = 0;
				RegionModTierfallen = -4;
				RegionModNahrungKraut = 0;
				break;
			case 8:
				Region = "südliche Sümpfe und Marschen";
				RegionModAnsitzPirsch = 2;
				RegionModHetz = 8;
				RegionModFischen = -4;
				RegionModTierfallen = 2;
				RegionModNahrungKraut = 2;
				break;
			case 9:
				Region = "Tundra";
				RegionModAnsitzPirsch = 2;
				RegionModHetz = 2;
				RegionModFischen = 0;
				RegionModTierfallen = 2;
				RegionModNahrungKraut = 2;
				break;
			case 10:
				Region = "nördliche Sümpfe und Moore";
				RegionModAnsitzPirsch = 4;
				RegionModHetz = 8;
				RegionModFischen = -2;
				RegionModTierfallen = 2;
				RegionModNahrungKraut = 4;
				break;
			case 11:
				Region = "Hochgebirge";
				RegionModAnsitzPirsch = 4;
				RegionModHetz = 8;
				RegionModFischen = 8;
				RegionModTierfallen = isNaN;
				RegionModNahrungKraut = 6;
				break;
			case 12:
				Region = "Wüste";
				RegionModAnsitzPirsch = 12;
				RegionModHetz = 12;
				RegionModFischen = isNaN;
				RegionModTierfallen = isNaN;
				RegionModNahrungKraut = 12;
				break;
			case 13:		//Ewiges Eis
				RegionModAnsitzPirsch = 12;
				RegionModHetz = 12;
				RegionModFischen = 8;
				RegionModTierfallen = isNaN;
				RegionModNahrungKraut = 12;
				break;
		}
		
		switch(TalentInput){
			case 0:	//Pirschjagd
				TalentName = "Pirschjagd";
				TalentValue = PirschjagdValue;
				Prey = " Fleisch";
				addwin = "";
				WeaponMod = WeaponModAnsitzPirsch;
				RegionMod = RegionModAnsitzPirsch;
				WindMod = WindModAnsitzHetzPirsch;
				checkFleischMod = checkFleischModraw;
				checkSharpMod = checkSharpModraw;
				checkMasterMod = checkMasterModraw;
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = courage;
				Att2 = intuition;
				Att3 = agility;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "GE";
				Time = 1;
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann wiederholt werden.";
				break;
			case 1:	//Hetzjagd
				TalentName = "Hetzjagd";
				TalentValue = HetzjagdValue;
				Prey = " Fleisch";
				addwin = "";
				RegionMod = RegionModHetz;
				WeaponMod = WeaponModHetz;
				WindMod = WindModAnsitzHetzPirsch;
				checkFleischMod = checkFleischModraw;
				checkSharpMod = checkSharpModraw;
				checkMasterMod = checkMasterModraw;
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = courage;
				Att2 = intuition;
				Att3 = agility;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "GE";
				Time = 1;
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann <b>nicht</b> wiederholt werden.";
				break;
			case 2:	//Ansitzjagd
				TalentName = "Ansitzjagd";
				TalentValue = AnsitzjagdValue;
				Prey = " Fleisch";
				addwin = "";
				WeaponMod = WeaponModAnsitzPirsch;
				RegionMod = RegionModAnsitzPirsch;
				WindMod = WindModAnsitzHetzPirsch;
				checkFleischMod = checkFleischModraw;
				checkSharpMod = checkSharpModraw;
				checkMasterMod = checkMasterModraw;
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = courage;
				Att2 = intuition;
				Att3 = agility;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "GE";
				Time = 1.5;
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann wiederholt werden.";
				break;
			case 3:	//Fischen/Angeln
				TalentName = "Fischen/Angeln";
				TalentValue = FischenAngelnValue;
				Prey = " Fisch";
				addwin = "";
				WeaponMod = WeaponModFischenNahrung;
				RegionMod = RegionModFischen;
				WindMod = WindModOthers;
				checkFleischMod = checkFleischModraw;
				checkSharpMod = 0;
				checkMasterMod = 0;
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = intuition;
				Att2 = dexterity;
				Att3 = strength;
				Eigenschaft1 = "IN";
				Eigenschaft2 = "FF";
				Eigenschaft3 = "KK";
				Time = 1;
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann wiederholt werden.";
				break;
			case 4:	//Speerfischen
				TalentName = "Speerfischen";
				TalentValue = SpeerfischenValue;
				Prey = " Fisch";
				addwin = "";
				WeaponMod = WeaponModSpeer;
				RegionMod = RegionModFischen;
				WindMod = WindModOthers;
				checkFleischMod = checkFleischModraw;
				checkSharpMod = checkSharpModraw;
				checkMasterMod = checkMasterModraw;
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = courage;
				Att2 = intuition;
				Att3 = agility;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "GE";
				Time = 1;
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann <b>nicht</b> wiederholt werden.";
				break;
			case 5:	//Nahrung suchen
				TalentName = "Nahrung suchen";
				TalentValue = NahrungKraeuterValue;
				Prey = " Obst, Gemüse, Nüsse, Pilze und Wurzeln"
				addwin = "";
				WeaponMod = WeaponModFischenNahrung;
				RegionMod = RegionModNahrungKraut;
				WindMod = WindModOthers;
				checkFleischMod = 0;									//Checkbox "nur schmackhaftes Fleisch" wird ignoriert
				checkSharpMod = 0;										//Checkbox "Scharfschütze" wird ignoriert
				checkMasterMod = 0;										//Checkbox "Meisterschütze" wird ignoriert
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = courage;
				Att2 = intuition;
				Att3 = dexterity;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "FF";
				Time = 1 + addTimeInput;
				addTimeMod = Math.round(addTimeInput/3);
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann <b>nicht</b> wiederholt werden.";
				break;
			case 6:	//Tierfallen aufstellen
				TalentName = "Tierfallen aufstellen";
				TalentValue = TierfallenValue;
				Prey = " Fleisch"
				addwin = "";
				WeaponMod = WeaponModTierfallen;
				RegionMod = RegionModTierfallen;
				WindMod = WindModOthers;
				checkFleischMod = 0;									//Checkbox "nur schmackhaftes Fleisch" wird ignoriert
				checkSharpMod = 0;										//Checkbox "Scharfschütze" wird ignoriert
				checkMasterMod = 0;										//Checkbox "Meisterschütze" wird ignoriert
				checkpGKMod = checkpGKModraw / 3 * 5;
				checkaeGKMod = checkaeGKModraw * 3;
				checkpOKMod = checkpOKModraw;
				Att1 = cleverness;
				Att2 = intuition;
				Att3 = dexterity;
				Eigenschaft1 = "KL";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "FF";
				Time = 1;
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = 1;										//Checkbox "eine weitere Stunde sammeln" wird ignoriert
				Repeat = "Die Probe kann <b>nicht</b> wiederholt werden.";
				break;
			case 7:	//Kräuter suchen
				TalentName = "Kräuter suchen";
				TalentValue = NahrungKraeuterValue;
				Prey = KrautPrey;
				addwin = winKraut;
				WeaponMod = WeaponModFischenNahrung;
				RegionMod = RegionModNahrungKraut;
				WindMod = WindModOthers;
				checkFleischMod = 0;									//Checkbox "nur schmackhaftes Fleisch" wird ignoriert
				checkSharpMod = 0;										//Checkbox "Scharfschütze" wird ignoriert
				checkMasterMod = 0;										//Checkbox "Meisterschütze" wird ignoriert
				checkpGKMod = checkpGKModraw;
				checkaeGKMod = checkaeGKModraw;
				checkpOKMod = checkpOKModraw;
				Att1 = cleverness;
				Att2 = intuition;
				Att3 = dexterity;
				Eigenschaft1 = "KL";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "FF";
				if(checkKrautModraw === 1.5){
					Time = 2;
				}else{
					Time = 1;
				}
				addTimeMod = 0;											//Eingabefeld "zusätzliche Zeit zum Sammeln [h]" wird ignoriert
				checkKrautMod = checkKrautModraw;
				Repeat = "Die Probe kann <b>nicht</b> wiederholt werden.";
				break;
				}			

	
		//Roll the dice
        let talentRoll = new Roll("3d20").roll({async: true});
        talentRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;

		TaW = TalentValue;

			mod = WeaponMod + RegionMod + WindMod + checkFleischMod + checkSharpMod + checkMasterMod + checkpGKMod + checkaeGKMod + checkpOKMod 
			modOutput = (mod >=0)? "+" + mod: mod;

			eTaW = (TaW * checkKrautMod) + addTimeMod;
			eTaWMod = eTaW - mod;
			resOne = Att1 - w1;
			resOne += (eTaWMod < 0)? eTaWMod: 0;
			resTwo = Att2 - w2;
			resTwo += (eTaWMod < 0)? eTaWMod: 0;
			resThree = Att3 - w3;
			resThree += (eTaWMod < 0)? eTaWMod: 0;
			TalentResult = (eTaWMod > 0)? eTaWMod : 0;
			TalentResult += (resOne < 0)? resOne : 0;
			TalentResult += (resTwo < 0)? resTwo : 0;
			TalentResult += (resThree < 0)? resThree : 0;
			TalentResult = (TalentResult == 0)? 1 : TalentResult;
			TalentResult = Math.min(TalentResult,eTaW);

            luck = (TalentResult >= 0)? "Erfolg":"Misserfolg";
            wSum1 = w1 + w2
            wSum2 = w1 + w3
            wSum3 = w2 + w3
            wSum4 = w1 + w2 + w3
            if(wSum1 == 2 || wSum2 == 2 || wSum3 == 2){
                if(wSum4 == 3){
                    luck = "Spektakulärer Erfolg";
                }else{
                    luck = "Glücklicher Erfolg";
                };
            };
            if(wSum1 == 40 || wSum2 == 40 || wSum3 == 40){
                if(wSum4 == 60){
                    luck = "Spektakulärer Patzer";
                }else{
                    luck = "Patzer";
                };
            };

			if(Time === 1){
				TimeUnit = " Stunde";
			}else{
				TimeUnit = " Stunden";
			}
			
			if(TalentResult === 1){
				Rationen = " Tagesration";
			}else{
				Rationen = " Tagesrationen";
			}
			
			fail = "Nach " + Time + TimeUnit + " kommt <b>" + tokenName + "</b> mit leeren Händen zurück";
			win = "Nach " + Time + TimeUnit + " erbeutet <b>" + tokenName + "</b> " + TalentResult + Rationen + Prey + hr + addwin;
            
			
			if(TalentResult < 0){
				failOut = fail;
			}else{
				failOut = win;
			}
			
			//Chat Output
			flavor = "<i>" + TalentName + " / " + Region + ":</i>" + hr; 
			flavor += Eigenschaft1 + ": " + w1 + "/" + "<b>" + Att1 + "</b>" + " (" + resOne + ")";
			flavor += "<br>" + Eigenschaft2 + ": " + w2 + "/" + "<b>" + Att2 + "</b>" + " (" + resTwo + ")";
			flavor += "<br>" + Eigenschaft3 + ": " + w3 + "/" + "<b>" + Att3 + "</b>" + " (" + resThree + ")";
			flavor += "<br>TaW/Modifikation: " + eTaW + "/" + modOutput;
			flavor += "<br>TaP*: " + TalentResult + hr;
			flavor += failOut + hr;
			flavor += Repeat;


            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode}
            );
        });
	}
}		   
