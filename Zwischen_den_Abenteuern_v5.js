//Skript für die Berechnung von Einkommen und Lebenshaltungskosten zwischen den Abenteuern

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
		const Sozialstatus = token.actor.system.base.social.social_status.value;																													//Astralenergie		AE


	//Talente des Helden
		const Taschendiebstahl = token.actor.items.find(item => item.name === "Taschendiebstahl");									
		const TaschendiebstahlValue = (Taschendiebstahl === undefined)? 0 : (Taschendiebstahl.system.value === null)? 0 : Taschendiebstahl.system.value;
		const Schloesserknacken = token.actor.items.find(item => item.name === "Schlösser Knacken");									
		const SchloesserknackenValue = (Schloesserknacken === undefined)? 0 : (Schloesserknacken.system.value === null)? 0 : Schloesserknacken.system.value;
		const FischenAngeln = token.actor.items.find(item => item.name === "Fischen/Angeln");									
		const FischenAngelnValue = (FischenAngeln === undefined)? 0 : (FischenAngeln.system.value === null)? 0 : FischenAngeln.system.value;
		const Kochen = token.actor.items.find(item => item.name === "Kochen");									
		const KochenValue = (Kochen === undefined)? 0 : (Kochen.system.value === null)? 0 : Kochen.system.value;
		const Holzbearbeitung = token.actor.items.find(item => item.name === "Holzbearbeitung");									
		const HolzbearbeitungValue = (Holzbearbeitung === undefined)? 0 : (Holzbearbeitung.system.value === null)? 0 : Holzbearbeitung.system.value;
		const Wildnisleben = token.actor.items.find(item => item.name === "Wildnisleben");									
		const WildnislebenValue = (Wildnisleben === undefined)? 0 : (Wildnisleben.system.value === null)? 0 : Wildnisleben.system.value;
		const Sinnenschaerfe = token.actor.items.find(item => item.name === "Sinnenschärfe");									
		const SinnenschaerfeValue = (Sinnenschaerfe === undefined)? 0 : (Sinnenschaerfe.system.value === null)? 0 : Sinnenschaerfe.system.value;
		const Selbstbeherrschung = token.actor.items.find(item => item.name === "Selbstbeherrschung");									
		const SelbstbeherrschungValue = (Selbstbeherrschung === undefined)? 0 : (Selbstbeherrschung.system.value === null)? 0 : Selbstbeherrschung.system.value;
		const Pflanzenkunde = token.actor.items.find(item => item.name === "Pflanzenkunde");									
		const PflanzenkundeValue = (Pflanzenkunde === undefined)? 0 : (Pflanzenkunde.system.value === null)? 0 : Pflanzenkunde.system.value;
		const Anderthalbhaender = token.actor.items.find(item => item.name === "Anderthalbhänder");									
		const AnderthalbhaenderValue = (Anderthalbhaender === undefined)? 0 : (Anderthalbhaender.system.value === null)? 0 : Anderthalbhaender.system.value;
		const Fechtwaffen = token.actor.items.find(item => item.name === "Fechtwaffen");									
		const FechtwaffenValue = (Fechtwaffen === undefined)? 0 : (Fechtwaffen.system.value === null)? 0 : Fechtwaffen.system.value;
		const Hiebwaffen = token.actor.items.find(item => item.name === "Hiebwaffen");									
		const HiebwaffenValue = (Hiebwaffen === undefined)? 0 : (Hiebwaffen.system.value === null)? 0 : Hiebwaffen.system.value;
		const Infanteriewaffen = token.actor.items.find(item => item.name === "Infanteriewaffen");									
		const InfanteriewaffenValue = (Infanteriewaffen === undefined)? 0 : (Infanteriewaffen.system.value === null)? 0 : Infanteriewaffen.system.value;
		const Kettenwaffen = token.actor.items.find(item => item.name === "Kettenwaffen");									
		const KettenwaffenValue = (Kettenwaffen === undefined)? 0 : (Kettenwaffen.system.value === null)? 0 : Kettenwaffen.system.value;
		const Saebel = token.actor.items.find(item => item.name === "Säbel");									
		const SaebelValue = (Saebel === undefined)? 0 : (Saebel.system.value === null)? 0 : Saebel.system.value;
		const Schwerter = token.actor.items.find(item => item.name === "Schwerter");									
		const SchwerterValue = (Schwerter === undefined)? 0 : (Schwerter.system.value === null)? 0 : Schwerter.system.value;
		const Speere = token.actor.items.find(item => item.name === "Speere");									
		const SpeereValue = (Speere === undefined)? 0 : (Speere.system.value === null)? 0 : Speere.system.value;
		const Staebe = token.actor.items.find(item => item.name === "Stäbe");									
		const StaebeValue = (Staebe === undefined)? 0 : (Staebe.system.value === null)? 0 : Staebe.system.value;
		const Zweihandflegel = token.actor.items.find(item => item.name === "Zweihandflegel");									
		const ZweihandflegelValue = (Zweihandflegel === undefined)? 0 : (Zweihandflegel.system.value === null)? 0 : Zweihandflegel.system.value;
		const ZweihandHiebwaffen = token.actor.items.find(item => item.name === "Zweihand-Hiebwaffen");									
		const ZweihandHiebwaffenValue = (ZweihandHiebwaffen === undefined)? 0 : (ZweihandHiebwaffen.system.value === null)? 0 : ZweihandHiebwaffen.system.value;
		const Zweihandschwertersaebel = token.actor.items.find(item => item.name === "Zweihandschwerter/-säbel");									
		const ZweihandschwertersaebelValue = (Zweihandschwertersaebel === undefined)? 0 : (Zweihandschwertersaebel.system.value === null)? 0 : Zweihandschwertersaebel.system.value;
		const Abrichten = token.actor.items.find(item => item.name === "Abrichten");									
		const AbrichtenValue = (Abrichten === undefined)? 0 : (Abrichten.system.value === null)? 0 : Abrichten.system.value;
		const Bootefahren = token.actor.items.find(item => item.name === "Boote Fahren");									
		const BootefahrenValue = (Bootefahren === undefined)? 0 : (Bootefahren.system.value === null)? 0 : Bootefahren.system.value;
		const Seefahrt = token.actor.items.find(item => item.name === "Seefahrt");									
		const SeefahrtValue = (Seefahrt === undefined)? 0 : (Seefahrt.system.value === null)? 0 : Seefahrt.system.value;
		const Feinmechanik = token.actor.items.find(item => item.name === "Feinmechanik");									
		const FeinmechanikValue = (Feinmechanik === undefined)? 0 : (Feinmechanik.system.value === null)? 0 : Feinmechanik.system.value;
		const Mechanik = token.actor.items.find(item => item.name === "Mechanik");									
		const MechanikValue = (Mechanik === undefined)? 0 : (Mechanik.system.value === null)? 0 : Mechanik.system.value;
		const Lehren = token.actor.items.find(item => item.name === "Lehren");									
		const LehrenValue = (Lehren === undefined)? 0 : (Lehren.system.value === null)? 0 : Lehren.system.value;
		const Zimmermann = token.actor.items.find(item => item.name === "Zimmermann");									
		const ZimmermannValue = (Zimmermann === undefined)? 0 : (Zimmermann.system.value === null)? 0 : Zimmermann.system.value;
		const Reiten = token.actor.items.find(item => item.name === "Reiten");									
		const ReitenValue = (Reiten === undefined)? 0 : (Reiten.system.value === null)? 0 : Reiten.system.value;
		const HeilkundeWunden = token.actor.items.find(item => item.name === "Heilkunde Wunden");									
		const HeilkundeWundenValue = (HeilkundeWunden === undefined)? 0 : (HeilkundeWunden.system.value === null)? 0 : HeilkundeWunden.system.value;
		const HeilkundeKrankheiten = token.actor.items.find(item => item.name === "Heilkunde Krankheiten");									
		const HeilkundeKrankheitenValue = (HeilkundeKrankheiten === undefined)? 0 : (HeilkundeKrankheiten.system.value === null)? 0 : HeilkundeKrankheiten.system.value;
		const HeilkundeGift = token.actor.items.find(item => item.name === "Heilkunde Gift");									
		const HeilkundeGiftValue = (HeilkundeGift === undefined)? 0 : (HeilkundeGift.system.value === null)? 0 : HeilkundeGift.system.value;
		const Alchimie = token.actor.items.find(item => item.name === "Alchimie");									
		const AlchimieValue = (Alchimie === undefined)? 0 : (Alchimie.system.value === null)? 0 : Alchimie.system.value;
		const Magiekunde = token.actor.items.find(item => item.name === "Magiekunde");									
		const MagiekundeValue = (Magiekunde === undefined)? 0 : (Magiekunde.system.value === null)? 0 : Magiekunde.system.value;
		const Kriegskunst = token.actor.items.find(item => item.name === "Kriegskunst");									
		const KriegskunstValue = (Kriegskunst === undefined)? 0 : (Kriegskunst.system.value === null)? 0 : Kriegskunst.system.value;

	//Metatalente
		KraeutersuchenValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
		WachehaltenValue = Math.round((SinnenschaerfeValue + SinnenschaerfeValue + SelbstbeherrschungValue)/3);
			



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
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br> arbeitet als" + "</h2>";
    inputDialog = headerDialog;
    inputDialog += divFlexStart + "Zeitraum (Wochen): <input id='inputTime'" + divInputNumber  + "1'/>" + divFlexEnd;
    inputDialog += divFlexStart + `
			<form action"#">
                 <label for="inputJob">Tätigkeit:</label>
                 <select name="inputJob" id="inputJob" style="float:right">
					<option value="99">----wähle eine Tätigkeit----</option>
					<option value="99">----illegale Arbeit----</option>
					<option value="0">Dieb*in</option>					
					<option value="1">Einbrecher*in</option>					
					<option value="99">----Billige Arbeitskraft----</option>
					<option value="20">Tagelöhner*in (SO: 1 - 4)</option>
					<option value="21">Schankgehilfe/Schankgehilfin (SO: 1 - 4)</option>
					<option value="22">Stallknecht/Magd  (SO: 1 - 4)</option>
					<option value="99">----Einfacher Arbeiter----</option>
					<option value="40">Fischer*in (SO: 3 - 8)</option>
					<option value="41">Koch/Köchin (SO: 5 - 10)</option>
					<option value="42">Kräutersammler*in (SO: 5 - 10)</option>
					<option value="43">Schreiner*in/Tischler*in (SO: 5 - 10)</option>
					<option value="44">Söldner*in (SO: 5 - 10)</option>
					<option value="45">Tierbändiger*in (SO: 5 - 10)</option>
					<option value="46">Matrose/Matrosin (SO: 1 - 10)</option>
					<option value="47">Nachtwächter*in (SO: 5 - 8)</option>
					<option value="99">----Qualifizierter Arbeiter----</option>
					<option value="60">Mechanicus/Mechanica (SO: 7-12)</option>
					<option value="61">Privatlehrer*in (SO: 7 - 10)</option>
					<option value="63">Schiffsbauer*in (SO: 7 - 10)</option>
					<option value="62">Zureiter*in (SO: 7 - 10)</option>
					<option value="99">----Hochqualifizierter Arbeiter----</option>
					<option value="80">Apotheker*in (SO: 8 -12)</option>
					<option value="81">Alchimist*in (SO: 6 - 10)</option>
					<option value="82">Magier*in (SO: 8 - 12)</option>
					<option value="83">Medicus/Medica (SO: 7 - 12)</option>
					<option value="84">Schwertmeister*in (SO: 10 - 14)</option>
					<option value="85">Söldnerführer*in (SO: 10 - 14)</option>
				</select>
			</form>
        `+ divFlexEnd
//    inputDialog += divFlexStart + "Sozialstatus (SO): <input id='inputSO'" + divInputNumber  + "1'/>" + divFlexEnd;		//nur aktivieren, wenn der Sozialstatus nicht als "GenericItem" angelegt worden ist
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="inputLifestyle">Lebensstil</label>
                 <select name="inputLifestyle" id="inputLifestyle" style="float:right">
                    <option value="0">Elend (SO: 1-3): 1 D/Monat</option>
                    <option value="1">Karg (SO: 4-6): 5 D/Monat</option>
                    <option value="2">Annehmbar (SO: 7-9): 15 D/Monat</option>
					<option value="3">Reichlich (SO: 10-12): 50 D/Monat</option>
                    <option value="4">Üppig (SO: 13-15): 150 D/Monat</option>
                    <option value="5">Prachtvoll (SO: 16+): 500+ D/Monat</option>
                 </select>
            </form>
        `+ divFlexEnd + hr;
		inputDialog += divFlexStart + `
            <label for="checkMagic">Ist die Ausübung von Magie/Alchimie illegal?</label><input type="checkbox" id="checkMagic" name="checkMagic" style="float:right">
        `+ divFlexEnd;

		
//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Zwischen den Abenteuern",
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
//		const Sozialstatus = Number(html.find("#inputSO")[0]?.value || 0);	//Sozialstatus
		const Time = Number(html.find("#inputTime")[0]?.value || 0);		//Arbeitszeit
		const selectJob = Number(html.find("#inputJob")[0]?.value || 0);
		const selectLifestyle = Number(html.find("#inputLifestyle")[0]?.value || 0);
		
		//Checkboxes
		const checkMagicInput = html.find("#checkMagic")[0].checked;		//ist die Ausübung von Magie oder Alchimie hier legal?
				Magiclegal = (checkMagic === true)? 0 : 1;					//Zuweisen eines Wertes für aktivierte Checkbox
				
		//Lohnlevel
		const None = 0;
		const Low = 1;
		const Mid = 10;
		const Upper = 50;
		const High = 100;
		
		//Dropdown
		switch(selectJob){
            case 0: 
				Job = "Dieb*in";
				TalentValue = TaschendiebstahlValue;
				SalaryLvl = Low;
				incomeDice = "1d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 0;
				break;
            case 1: 
				Job = "Einbrecher*in";
				TalentValue = SchloesserknackenValue;
				SalaryLvl = Low;
				incomeDice = "1d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 0;
				break;
            case 20: 
				Job = "Tagelöhner*in";
				TalentValue = Math.ceil((constitution + strength)/2);
				SalaryLvl = Low;
				incomeDice = "1d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 1;
				break;
            case 21: 
				Job = "Schankgehilfe/Schankgehilfin";
				TalentValue = Math.ceil((charisma + dexterity)/2);
				SalaryLvl = Low;
				incomeDice = "1d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 1;
				break;
			case 22: 
				Job = "Stallknecht/Magd";
				TalentValue = Math.ceil((agility + constitution)/2);
				SalaryLvl = Low;
				incomeDice = "1d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 1;
				break;
			case 40: Job = "Fischer*in";
				TalentValue = FischenAngelnValue;
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 3;
				upperSO = 8;
				legal = 1;
				break;
			case 41: 
				Job = "Koch/Köchin";
				TalentValue = KochenValue;
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 42: 
				Job = "Kräutersammler*in";
				TalentValue = KraeutersuchenValue;
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 44: 
				Job = "Söldner*in";
				TalentValue = Math.max(AnderthalbhaenderValue, FechtwaffenValue, HiebwaffenValue, InfanteriewaffenValue, KettenwaffenValue, SaebelValue, SchwerterValue, SpeereValue, StaebeValue, ZweihandflegelValue, ZweihandHiebwaffenValue, ZweihandschwertersaebelValue);
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 43:
				Job = "Schreiner*in/Tischler*in";
				TalentValue = HolzbearbeitungValue;
				SalaryLvl = Mid;
				incomeDice = "1d4"
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 45: 
				Job = "Tierbändiger*in";
				TalentValue = AbrichtenValue;
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 46: 
				Job = "Matrose/Matrosin";
				TalentValue = Math.ceil((2*BootefahrenValue + SeefahrtValue)/3);
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 1;
				upperSO = 10;
				legal = 1;
				break;
			case 47: 
				Job = "Nachtwächter*in";
				TalentValue = WachehaltenValue;
				SalaryLvl = Mid;
				incomeDice = "1d4";
				lowerSO = 5;
				upperSO = 8;
				legal = 1;
				break;
			case 60: 
				Job = "Mechanicus/Mechanica";
				TalentValue = Math.max(FeinmechanikValue, MechanikValue);
				SalaryLvl = Upper;
				incomeDice = "1d4";
				lowerSO = 7;
				upperSO = 12;
				legal = 1;
				break;
			case 61: 
				Job = "Privatlehrer*in";
				TalentValue = LehrenValue;
				SalaryLvl = Upper;
				incomeDice = "1d4";
				lowerSO = 7;
				upperSO = 10;
				legal = 1;
				break;
			case 62: 
				Job = "Zureiter*in";
				TalentValue = Math.ceil((AbrichtenValue + ReitenValue)/2);
				SalaryLvl = Upper;
				incomeDice = "1d4";
				lowerSO = 7;
				upperSO = 10;
				legal = 1;
				break;
			case 63: 
				Job = "Schiffsbauer*in";
				TalentValue = Math.ceil((ZimmermannValue + HolzbearbeitungValue)/2);
				SalaryLvl = Upper;
				incomeDice = "1d4";
				lowerSO = 7;
				upperSO = 10;
				legal = 1;
				break;
			case 80: 
				Job = "Apotheker*in";
				TalentValue = Math.ceil((AlchimieValue + HeilkundeWundenValue + HeilkundeGiftValue)/3);
				SalaryLvl = High;
				incomeDice = "1d4";
				lowerSO = 8;
				upperSO = 12;
				legal = 1;
				break;
			case 81: 
				Job = "Alchimist*in";
				TalentValue = AlchimieValue;
				SalaryLvl = High;
				incomeDice = "1d4";
				lowerSO = 6;
				upperSO = 10;
				if(Magiclegal === 0){
					legal = 0;
				}if(Magiclegal === 1){
					legal = 1;
				}
				break;
			case 82: 
				Job = "Magier*in";
				TalentValue = MagiekundeValue;
				SalaryLvl = High;
				incomeDice = "1d4";
				lowerSO = 8;
				upperSO = 12;
				if(Magiclegal === 0){
					legal = 0;
				}if(Magiclegal === 1){
					legal = 1;
				}
				break;
			case 83: 
				Job ="Medicus/Medica";
				TalentValue = Math.ceil((HeilkundeWundenValue + HeilkundeKrankheitenValue)/2);
				SalaryLvl = High;
				incomeDice = "1d4";
				lowerSO = 7;
				upperSO = 12;
				legal = 1;
				break;
			case 84: 
				Job = "Schwertmeister*in";
				TalentValue = Math.ceil((2*KriegskunstValue + LehrenValue + 2*(Math.max(AnderthalbhaenderValue, FechtwaffenValue, SaebelValue, SchwerterValue, ZweihandschwertersaebelValue)))/5);
				SalaryLvl = High;
				incomeDice = "1d4";
				lowerSO = 10;
				upperSO = 14;
				legal = 1;
				break;
			case 85: 
				Job = "Söldnerführer*in";
				TalentValue = Math.ceil((2*KriegskunstValue + (Math.max(AnderthalbhaenderValue, FechtwaffenValue, HiebwaffenValue, InfanteriewaffenValue, KettenwaffenValue, SaebelValue, SchwerterValue, SpeereValue, StaebeValue, ZweihandflegelValue, ZweihandHiebwaffenValue, ZweihandschwertersaebelValue)))/3);
				incomeDice = "1d4";
				lowerSO = 10;
				upperSO = 14;
				legal = 1;
				break;
		}

		//Lebenshaltungskosten pro Woche
		switch(selectLifestyle){
            case 0:
				totalcosts = 25;
				costsDukaten = 0;
				costsSilber = 2;
				costsHeller = 5;
				break;
            case 1:
				totalcosts = 125;
				costsDukaten = 1;
				costsSilber = 2;
				costsHeller = 5;
				break;
            case 2:
				totalcosts = 375;
				costsDukaten = 3;
				costsSilber = 7;
				costsHeller = 5;
				break;
			case 3:
				totalcosts = 1250;
				costsDukaten = 12;
				costsSilber = 5;
				costsHeller = 0;
				break;
            case 4:
				totalcosts = 3750;
				costsDukaten = 37;
				costsSilber = 5;
				costsHeller = 0;
				break;
            case 5:
				totalcosts = 12500;
				costsDukaten = 125;
				costsSilber = 0;
				costsHeller = 0;
				break;
        }
		
	//Einfluss eines unpassenden Sozialstatus auf den Lohn
		if(Sozialstatus < lowerSO){
			SOmod = (lowerSO - Sozialstatus)/100;
		}if(Sozialstatus > upperSO){
			SOmod = 1 + ((Sozialstatus - upperSO)/100);
		}else{
			SOmod = 1;
		}


		//Roll the dice
        incomeRoll = new Roll(incomeDice).roll({async: true});
		incomeRoll.then(roll =>{
			let incomeResult = roll.total;
		JobtimeDice = "1d6";
        JobtimeRoll = new Roll(JobtimeDice).roll({async:true})
        JobtimeRoll.then(roll =>{
			let JobtimeResult = roll.total;
		illegalDice = "1d20";
		illegalRoll = new Roll(illegalDice).roll({async:true})
		illegalRoll.then(roll =>{
			let illegalResult = roll.total;
		bustedDice = "1d20";
		bustedRoll = new Roll(bustedDice).roll({async:true})
		bustedRoll.then(roll =>{
			let bustedResult = roll.total;


		//Wird der Held bei einer illegalen Tat ertappt?
		Caught = 20 - (TalentValue/2) - (Sozialstatus/2);

		//Berechnung der Arbeitstage:
		realJobTime = Time * JobtimeResult;
		if(realJobTime === 1){
			Unit = " Tag ";
		}else{
			Unit = " Tage ";
		}
		
		
		//Einfluss der Talentwertes auf den Lohn
		if(TalentValue < 7){
			SalaryMod = (4 - (7 - TalentValue))/4;
		}if(TalentValue > 12){
			SalaryMod = (4 + (TalentValue - 12))/4;
		}else{
			SalaryMod = 1;
		}
		
		//Berechnung des Einkommens nach Inkommenslevel
		if(SalaryLvl === Low){
			Income = Low + incomeResult;
		}if(SalaryLvl === Mid){
			Income = Mid + ((incomeResult - 1)*10);
		}if(SalaryLvl === Upper){
			Income = Upper + ((incomeResult - 1)*10);
		}if(SalaryLvl === High){
			Income = High + ((incomeResult - 1)*100);
		}
		
		//Berechnung des Lohns
		if(TalentValue < 4 || (legal === 0 && illegalResult < Caught)){
			FinalSalary = None;
		}else{
			FinalSalary = SOmod * (realJobTime * (SalaryMod * Income));
		}

		//Umrechnung in Dukaten, Silber, Heller:
		Centum = Math.floor(FinalSalary/100);
		Decem = Math.floor((FinalSalary/10) - (Centum*10));
		Unum = Math.floor(FinalSalary - (Decem*10) - (Centum*100));
		Dukaten = Centum;
		Silber = Decem;
		Heller = Unum;
		
		//Berechnung des Netto-Einkommens abzüglich der Lebenshaltungskosten
		Netto = FinalSalary - totalcosts;
		NettoCentum = Math.floor(Netto/100);
		NettoDecem = Math.floor((Netto/10) - (NettoCentum*10));
		NettoUnum = Math.floor(Netto - (NettoDecem*10) - (NettoCentum*100));
		NettoDukaten = NettoCentum;
		NettoSilber = NettoDecem;
		NettoHeller = NettoUnum;
		

			//Chat Output
            flavor = "<b> Zwischen den Abenteuern </b>" + hr;
			flavor += "<b>" + tokenName + "</b> arbeitet " + realJobTime + Unit + "als <b>" + Job + "</b>:<br>"
			flavor += "(Lohn/Lebensstiel/Differenz)<br>"
			flavor += Dukaten + " / -" + costsDukaten + " /   <b>" + NettoDukaten + "</b> Dukaten<br>";
			flavor += Silber + " / -" + costsSilber + " /   <b>" + NettoSilber + "</b> Silber<br>";
			flavor += Heller + " / -" + costsHeller + " /   <b>" + NettoHeller + "</b> Heller<br>";
			flavor += "Talentwert: " + TalentValue + "<br>";
//			flavor += "FinalSalary: " + FinalSalary + "<br>";						//Test, ob Skript funktioniert
//			flavor += "incomeDice: " + incomeDice + "<br>";							//Test, ob Skript funktioniert
//			flavor += "incomeResult: " + incomeResult + "<br>";						//Test, ob Skript funktioniert
//			flavor += "Lohnstufe: " + SalaryLvl + "<br>";							//Test, ob Skript funktioniert
//			flavor += "illegalResult: " + illegalResult + "/" + Caught + "<br>";	//Test, ob Skript funktioniert
//			flavor += "bustedResult: " + bustedResult + "<br>";						//Test, ob Skript funktioniert
			flavor += "Sozialstatus: " + Sozialstatus + "<br>";				//Test, ob Skript funktioniert
			if(legal === 0 && illegalResult < Caught){
				if(bustedResult < 20){
					flavor += "<b>" + tokenName + "</b> wird bei der Tat erwischt";
				}else{					
					flavor += "<b>" + tokenName + "</b> wird bei der Tat erwischt und eingesperrt. Die Kaution beträgt das 10fache der geklauten Summe.";
				}
			}
				
            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode}
            );
		})})})});	//Schließen aller Klammer aus "Roll the Dice"
	}			//Schließen der Klammer: async function htmlCallback (html)
}				//Schließen der Klammer: async function main ()
