//Skript für die Berechnung von Einkommen und Lebenshaltungskosten zwischen den Abenteuern
//Die Talente "Ritualkenntnis: Gildenmagie", "Ritualkenntnis: Runenzauberei" und "Ritualkenntnis: Scharlatan" müssen als "Gildenmagie", "Runenzauberei" und "Scharlatan" angelegt sein

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
		const Abrichten = token.actor.items.find(item => item.name === "Abrichten");									
		const AbrichtenValue = (Abrichten === undefined)? 0 : (Abrichten.system.value === null)? 0 : Abrichten.system.value;
		const Anderthalbhaender = token.actor.items.find(item => item.name === "Anderthalbhänder");									
		const AnderthalbhaenderValue = (Anderthalbhaender === undefined)? 0 : (Anderthalbhaender.system.value === null)? 0 : Anderthalbhaender.system.value;
		const Alchimie = token.actor.items.find(item => item.name === "Alchimie");									
		const AlchimieValue = (Alchimie === undefined)? 0 : (Alchimie.system.value === null)? 0 : Alchimie.system.value;
		const Armbrust = token.actor.items.find(item => item.name === "Armbrust");									
		const ArmbrustValue = (Armbrust === undefined)? 0 : (Armbrust.system.value === null)? 0 : Armbrust.system.value;
		const Bogen = token.actor.items.find(item => item.name === "Bogen");									
		const BogenValue = (Bogen === undefined)? 0 : (Bogen.system.value === null)? 0 : Bogen.system.value;
		const Bogenbau = token.actor.items.find(item => item.name === "Bogenbau");									
		const BogenbauValue = (Bogenbau === undefined)? 0 : (Bogenbau.system.value === null)? 0 : Bogenbau.system.value;
		const Bootefahren = token.actor.items.find(item => item.name === "Boote Fahren");									
		const BootefahrenValue = (Bootefahren === undefined)? 0 : (Bootefahren.system.value === null)? 0 : Bootefahren.system.value;
		const FahrzeugLenken = token.actor.items.find(item => item.name === "Fahrzeug Lenken");									
		const FahrzeugLenkenValue = (FahrzeugLenken === undefined)? 0 : (FahrzeugLenken.system.value === null)? 0 : FahrzeugLenken.system.value;
		const Fechtwaffen = token.actor.items.find(item => item.name === "Fechtwaffen");									
		const FechtwaffenValue = (Fechtwaffen === undefined)? 0 : (Fechtwaffen.system.value === null)? 0 : Fechtwaffen.system.value;
		const Feinmechanik = token.actor.items.find(item => item.name === "Feinmechanik");									
		const FeinmechanikValue = (Feinmechanik === undefined)? 0 : (Feinmechanik.system.value === null)? 0 : Feinmechanik.system.value;
		const FischenAngeln = token.actor.items.find(item => item.name === "Fischen/Angeln");									
		const FischenAngelnValue = (FischenAngeln === undefined)? 0 : (FischenAngeln.system.value === null)? 0 : FischenAngeln.system.value;
		const Handel = token.actor.items.find(item => item.name === "Handel");									
		const HandelValue = (Handel === undefined)? 0 : (Handel.system.value === null)? 0 : Handel.system.value;
		const HeilkundeGift = token.actor.items.find(item => item.name === "Heilkunde Gift");									
		const HeilkundeGiftValue = (HeilkundeGift === undefined)? 0 : (HeilkundeGift.system.value === null)? 0 : HeilkundeGift.system.value;
		const HeilkundeKrankheiten = token.actor.items.find(item => item.name === "Heilkunde Krankheiten");									
		const HeilkundeKrankheitenValue = (HeilkundeKrankheiten === undefined)? 0 : (HeilkundeKrankheiten.system.value === null)? 0 : HeilkundeKrankheiten.system.value;
		const HeilkundeWunden = token.actor.items.find(item => item.name === "Heilkunde Wunden");									
		const HeilkundeWundenValue = (HeilkundeWunden === undefined)? 0 : (HeilkundeWunden.system.value === null)? 0 : HeilkundeWunden.system.value;
		const Hiebwaffen = token.actor.items.find(item => item.name === "Hiebwaffen");									
		const HiebwaffenValue = (Hiebwaffen === undefined)? 0 : (Hiebwaffen.system.value === null)? 0 : Hiebwaffen.system.value;
		const Holzbearbeitung = token.actor.items.find(item => item.name === "Holzbearbeitung");									
		const HolzbearbeitungValue = (Holzbearbeitung === undefined)? 0 : (Holzbearbeitung.system.value === null)? 0 : Holzbearbeitung.system.value;
		const Infanteriewaffen = token.actor.items.find(item => item.name === "Infanteriewaffen");									
		const InfanteriewaffenValue = (Infanteriewaffen === undefined)? 0 : (Infanteriewaffen.system.value === null)? 0 : Infanteriewaffen.system.value;
		const Kettenwaffen = token.actor.items.find(item => item.name === "Kettenwaffen");									
		const KettenwaffenValue = (Kettenwaffen === undefined)? 0 : (Kettenwaffen.system.value === null)? 0 : Kettenwaffen.system.value;
		const Kochen = token.actor.items.find(item => item.name === "Kochen");									
		const KochenValue = (Kochen === undefined)? 0 : (Kochen.system.value === null)? 0 : Kochen.system.value;
		const Kriegskunst = token.actor.items.find(item => item.name === "Kriegskunst");									
		const KriegskunstValue = (Kriegskunst === undefined)? 0 : (Kriegskunst.system.value === null)? 0 : Kriegskunst.system.value;
		const Lehren = token.actor.items.find(item => item.name === "Lehren");									
		const LehrenValue = (Lehren === undefined)? 0 : (Lehren.system.value === null)? 0 : Lehren.system.value;
		const Magiekunde = token.actor.items.find(item => item.name === "Magiekunde");									
		const MagiekundeValue = (Magiekunde === undefined)? 0 : (Magiekunde.system.value === null)? 0 : Magiekunde.system.value;
		const Mechanik = token.actor.items.find(item => item.name === "Mechanik");									
		const MechanikValue = (Mechanik === undefined)? 0 : (Mechanik.system.value === null)? 0 : Mechanik.system.value;
		const Musizieren = token.actor.items.find(item => item.name === "Musizieren");									
		const MusizierenValue = (Musizieren === undefined)? 0 : (Musizieren.system.value === null)? 0 : Musizieren.system.value;
		const Pflanzenkunde = token.actor.items.find(item => item.name === "Pflanzenkunde");									
		const PflanzenkundeValue = (Pflanzenkunde === undefined)? 0 : (Pflanzenkunde.system.value === null)? 0 : Pflanzenkunde.system.value;
		const Reiten = token.actor.items.find(item => item.name === "Reiten");									
		const ReitenValue = (Reiten === undefined)? 0 : (Reiten.system.value === null)? 0 : Reiten.system.value;
		const Saebel = token.actor.items.find(item => item.name === "Säbel");									
		const SaebelValue = (Saebel === undefined)? 0 : (Saebel.system.value === null)? 0 : Saebel.system.value;
		const Schauspielerei = token.actor.items.find(item => item.name === "Schauspielerei");									
		const SchauspielereiValue = (Schauspielerei === undefined)? 0 : (Schauspielerei.system.value === null)? 0 : Schauspielerei.system.value;
		const Schwerter = token.actor.items.find(item => item.name === "Schwerter");									
		const SchwerterValue = (Schwerter === undefined)? 0 : (Schwerter.system.value === null)? 0 : Schwerter.system.value;
		const Seefahrt = token.actor.items.find(item => item.name === "Seefahrt");									
		const SeefahrtValue = (Seefahrt === undefined)? 0 : (Seefahrt.system.value === null)? 0 : Seefahrt.system.value;
		const Selbstbeherrschung = token.actor.items.find(item => item.name === "Selbstbeherrschung");									
		const SelbstbeherrschungValue = (Selbstbeherrschung === undefined)? 0 : (Selbstbeherrschung.system.value === null)? 0 : Selbstbeherrschung.system.value;
		const Singen = token.actor.items.find(item => item.name === "Singen");									
		const SingenValue = (Singen === undefined)? 0 : (Singen.system.value === null)? 0 : Singen.system.value;
		const Sinnenschaerfe = token.actor.items.find(item => item.name === "Sinnenschärfe");									
		const SinnenschaerfeValue = (Sinnenschaerfe === undefined)? 0 : (Sinnenschaerfe.system.value === null)? 0 : Sinnenschaerfe.system.value;
		const SichVerstecken = token.actor.items.find(item => item.name === "Sich Verstecken");									
		const SichVersteckenValue = (SichVerstecken === undefined)? 0 : (SichVerstecken.system.value === null)? 0 : SichVerstecken.system.value;
		const Speere = token.actor.items.find(item => item.name === "Speere");									
		const SpeereValue = (Speere === undefined)? 0 : (Speere.system.value === null)? 0 : Speere.system.value;
		const Staebe = token.actor.items.find(item => item.name === "Stäbe");									
		const StaebeValue = (Staebe === undefined)? 0 : (Staebe.system.value === null)? 0 : Staebe.system.value;
		const SteinschneiderJuwelier = token.actor.items.find(item => item.name === "Steinschneider/Juwelier");									
		const SteinschneiderJuwelierValue = (SteinschneiderJuwelier === undefined)? 0 : (SteinschneiderJuwelier.system.value === null)? 0 : SteinschneiderJuwelier.system.value;
		const Taschendiebstahl = token.actor.items.find(item => item.name === "Taschendiebstahl");									
		const TaschendiebstahlValue = (Taschendiebstahl === undefined)? 0 : (Taschendiebstahl.system.value === null)? 0 : Taschendiebstahl.system.value;
		const Tierkunde = token.actor.items.find(item => item.name === "Tierkunde");									
		const TierkundeValue = (Tierkunde === undefined)? 0 : (Tierkunde.system.value === null)? 0 : Tierkunde.system.value;
		const RitualkenntnisGildenmagie = token.actor.items.find(item => item.name === "Gildenmagie");									
		const RitualkenntnisGildenmagieValue = (RitualkenntnisGildenmagie === undefined)? 0 : (RitualkenntnisGildenmagie.system.value === null)? 0 : RitualkenntnisGildenmagie.system.value;
		const RitualkenntnisRunenzauberei = token.actor.items.find(item => item.name === "Runenzauberei");									
		const RitualkenntnisRunenzaubereiValue = (RitualkenntnisRunenzauberei === undefined)? 0 : (RitualkenntnisRunenzauberei.system.value === null)? 0 : RitualkenntnisRunenzauberei.system.value;
		const RitualkenntnisScharlatan = token.actor.items.find(item => item.name === "Scharlatan");									
		const RitualkenntnisScharlatanValue = (RitualkenntnisScharlatan === undefined)? 0 : (RitualkenntnisScharlatan.system.value === null)? 0 : RitualkenntnisScharlatan.system.value;
		const Schloesserknacken = token.actor.items.find(item => item.name === "Schlösser Knacken");									
		const SchloesserknackenValue = (Schloesserknacken === undefined)? 0 : (Schloesserknacken.system.value === null)? 0 : Schloesserknacken.system.value;
		const Wildnisleben = token.actor.items.find(item => item.name === "Wildnisleben");									
		const WildnislebenValue = (Wildnisleben === undefined)? 0 : (Wildnisleben.system.value === null)? 0 : Wildnisleben.system.value;
		const Wurfspeer = token.actor.items.find(item => item.name === "Wurfspeer");									
		const WurfspeerValue = (Wurfspeer === undefined)? 0 : (Wurfspeer.system.value === null)? 0 : Wurfspeer.system.value;
		const Zweihandflegel = token.actor.items.find(item => item.name === "Zweihandflegel");									
		const ZweihandflegelValue = (Zweihandflegel === undefined)? 0 : (Zweihandflegel.system.value === null)? 0 : Zweihandflegel.system.value;
		const ZweihandHiebwaffen = token.actor.items.find(item => item.name === "Zweihand-Hiebwaffen");									
		const ZweihandHiebwaffenValue = (ZweihandHiebwaffen === undefined)? 0 : (ZweihandHiebwaffen.system.value === null)? 0 : ZweihandHiebwaffen.system.value;
		const Zweihandschwertersaebel = token.actor.items.find(item => item.name === "Zweihandschwerter/-säbel");									
		const ZweihandschwertersaebelValue = (Zweihandschwertersaebel === undefined)? 0 : (Zweihandschwertersaebel.system.value === null)? 0 : Zweihandschwertersaebel.system.value;
		const Zimmermann = token.actor.items.find(item => item.name === "Zimmermann");									
		const ZimmermannValue = (Zimmermann === undefined)? 0 : (Zimmermann.system.value === null)? 0 : Zimmermann.system.value;

	//Metatalente
		KraeutersuchenValue = Math.round((WildnislebenValue + SinnenschaerfeValue + PflanzenkundeValue)/3);
		WachehaltenValue = Math.round((SinnenschaerfeValue + SinnenschaerfeValue + SelbstbeherrschungValue)/3);
		
	//Sozialstatus: zunächst als "generic Item" anlegen
	//	const Sozialstatus = token.actor.items.find(item => item.name === "Sozialstatus");									
	//	const SozialstatusValue = (Sozialstatus === undefined)? 0 : (Sozialstatus.system.quantity === null)? 0 : Sozialstatus.system.quantity;

	//Sozialstatus über das Skript: Belohnung gesetzt:
		const SozialstatusValue = token.actor.system.base.social.social_status.value;



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
					<option value="2">Schmuggler*in</option>					
					<option value="99">----Billige Arbeitskraft----</option>
					<option value="20">Tagelöhner*in (SO: 1 - 4)</option>
					<option value="21">Schankgehilfe/Schankgehilfin (SO: 1 - 4)</option>
					<option value="22">Stallknecht/Magd (SO: 1 - 4)</option>
					<option value="99">----Einfacher Arbeiter----</option>
					<option value="40">Barde/Bardin (SO: 5 - 10)</option>
					<option value="41">Bogenbauer*in/Armbruster*in (SO: 5 - 10)</option>
					<option value="42">Fischer*in (SO: 3 - 8)</option>
					<option value="43">Goldschmied*in (SO: 5 - 10)</option>
					<option value="44">Jäger*in (SO: 3 - 7)</option>
					<option value="45">Koch/Köchin (SO: 5 - 10)</option>
					<option value="46">Kräutersammler*in (SO: 5 - 10)</option>
					<option value="47">Schreiner*in/Tischler*in (SO: 5 - 10)</option>
					<option value="48">Schaukämpfer*in (SO: 5 - 10)</option>
					<option value="49">Söldner*in (SO: 5 - 10)</option>
					<option value="50">Tierbändiger*in (SO: 5 - 10)</option>
					<option value="51">Matrose/Matrosin (SO: 1 - 10)</option>
					<option value="52">Nachtwächter*in (SO: 5 - 8)</option>
					<option value="99">----Qualifizierter Arbeiter----</option>
					<option value="60">Mechanicus/Mechanica (SO: 7-12)</option>
					<option value="61">Privatlehrer*in (SO: 7 - 10)</option>
					<option value="62">Schiffsbauer*in (SO: 7 - 10)</option>
					<option value="63">Zureiter*in (SO: 7 - 10)</option>
					<option value="99">----Hochqualifizierter Arbeiter----</option>
					<option value="80">Apotheker*in (SO: 8 -12)</option>
					<option value="81">Alchimist*in (SO: 6 - 10)</option>
					<option value="82">Magier*in (SO: 8 - 12)</option>
					<option value="83">Medicus/Medica (SO: 7 - 12)</option>
					<option value="84">Schwertmeister*in (SO: 10 - 14)</option>
					<option value="85">Söldnerführer*in (SO: 7 - 12)</option>
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
		const checkMagicInput = html.find("#checkMagic")[0].checked;		//ist die Ausübung von Magie oder Alchimie hier legal oder illegal?
				Magiclegal = (checkMagic === true)? 0 : 1;					//Zuweisen eines Wertes für aktivierte Checkbox
				
	//Lohnlevel
		const None = 0;
		const Low = 1;
		const Mid = 10;
		const Upper = 50;
		const High = 100;
		
	//Tätigkeit
		switch(selectJob){
            case 0: 
				Job = "Dieb*in";
				TalentValue = TaschendiebstahlValue;
				SalaryLvl = Low;
				incomeDice_dx = "d20";
				lowerSO = 1;
				upperSO = 4;
				legal = 0;
				break;
            case 1: 
				Job = "Einbrecher*in";
				TalentValue = SchloesserknackenValue;
				SalaryLvl = Low;
				incomeDice_dx = "d20";
				lowerSO = 1;
				upperSO = 4;
				legal = 0;
				break;
            case 2: 
				Job = "Schmuggler*in";
				TalentValue = Math.round(SichVersteckenValue + (Math.max(BootefahrenValue, FahrzeugLenken) + HandelValue))/3;
				SalaryLvl = Low;
				incomeDice_dx = "d20";
				lowerSO = 1;
				upperSO = 7;
				legal = 0;
				break;
            case 20: 
				Job = "Tagelöhner*in";
				TalentValue = Math.round((constitution + strength)/2);
				SalaryLvl = Low;
				incomeDice_dx = "d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 1;
				break;
            case 21: 
				Job = "Schankgehilfe/Schankgehilfin";
				TalentValue = Math.round((charisma + dexterity)/2);
				SalaryLvl = Low;
				incomeDice_dx = "d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 1;
				break;
			case 22: 
				Job = "Stallknecht/Magd";
				TalentValue = Math.round((agility + constitution)/2);
				SalaryLvl = Low;
				incomeDice_dx = "d8";
				lowerSO = 1;
				upperSO = 4;
				legal = 1;
				break;
			case 40: Job = "Barde/Bardin";
				TalentValue = Math.round((MusizierenValue + SingenValue)/2);
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 41: Job = "Bogenbauer*in/Armbruster*in";
				TalentValue = Math.round((2*BogenbauValue + Math.max(ArmbrustValue, BogenValue))/3);
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 42: Job = "Fischer*in";
				TalentValue = FischenAngelnValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 3;
				upperSO = 8;
				legal = 1;
				break;
			case 43: Job = "Goldschmied*in";
				TalentValue = SteinschneiderJuwelierValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 44: Job = "Jäger*in";
				TalentValue = Math.round((SichVersteckenValue + TierkundeValue + Math.max(ArmbrustValue, BogenValue, WurfspeerValue))/3);
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 3;
				upperSO = 7;
				legal = 1;
				break;
			case 45: 
				Job = "Koch/Köchin";
				TalentValue = KochenValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 46: 
				Job = "Kräutersammler*in";
				TalentValue = KraeutersuchenValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 47:
				Job = "Schreiner*in/Tischler*in";
				TalentValue = HolzbearbeitungValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4"
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 48: 
				Job = "Schaukämpfer*in";
				TalentValue = Math.round((SchauspielereiValue + 2*Math.max(AnderthalbhaenderValue, FechtwaffenValue, HiebwaffenValue, InfanteriewaffenValue, KettenwaffenValue, SaebelValue, SchwerterValue, SpeereValue, StaebeValue, ZweihandflegelValue, ZweihandHiebwaffenValue, ZweihandschwertersaebelValue))/3);
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 49: 
				Job = "Söldner*in";
				TalentValue = Math.max(AnderthalbhaenderValue, FechtwaffenValue, HiebwaffenValue, InfanteriewaffenValue, KettenwaffenValue, SaebelValue, SchwerterValue, SpeereValue, StaebeValue, ZweihandflegelValue, ZweihandHiebwaffenValue, ZweihandschwertersaebelValue, ArmbrustValue, BogenValue, WurfspeerValue);
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 50: 
				Job = "Tierbändiger*in";
				TalentValue = AbrichtenValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 10;
				legal = 1;
				break;
			case 51: 
				Job = "Matrose/Matrosin";
				TalentValue = Math.round((2*BootefahrenValue + SeefahrtValue)/3);
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 1;
				upperSO = 10;
				legal = 1;
				break;
			case 52: 
				Job = "Nachtwächter*in";
				TalentValue = WachehaltenValue;
				SalaryLvl = Mid;
				incomeDice_dx = "d4";
				lowerSO = 5;
				upperSO = 8;
				legal = 1;
				break;
			case 60: 
				Job = "Mechanicus/Mechanica";
				TalentValue = Math.max(FeinmechanikValue, MechanikValue);
				SalaryLvl = Upper;
				incomeDice_dx = "d4";
				lowerSO = 7;
				upperSO = 12;
				legal = 1;
				break;
			case 61: 
				Job = "Privatlehrer*in";
				TalentValue = LehrenValue;
				SalaryLvl = Upper;
				incomeDice_dx = "d4";
				lowerSO = 7;
				upperSO = 10;
				legal = 1;
				break;
			case 62: 
				Job = "Schiffsbauer*in";
				TalentValue = Math.round((ZimmermannValue + HolzbearbeitungValue)/2);
				SalaryLvl = Upper;
				incomeDice_dx = "d4";
				lowerSO = 7;
				upperSO = 10;
				legal = 1;
				break;
			case 63: 
				Job = "Zureiter*in";
				TalentValue = Math.round(((2* AbrichtenValue) + ReitenValue)/3);
				SalaryLvl = Upper;
				incomeDice_dx = "d4";
				lowerSO = 7;
				upperSO = 10;
				legal = 1;
				break;
			case 80: 
				Job = "Apotheker*in";
				TalentValue = Math.round((AlchimieValue + HeilkundeWundenValue + HeilkundeGiftValue)/3);
				SalaryLvl = High;
				incomeDice_dx = "d4";
				lowerSO = 8;
				upperSO = 12;
				legal = 1;
				break;
			case 81: 
				Job = "Alchimist*in";
				TalentValue = AlchimieValue;
				SalaryLvl = High;
				incomeDice_dx = "d4";
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
				TalentValue = Math.round((MagiekundeValue + 2*(Math.max(RitualkenntnisGildenmagieValue, RitualkenntnisRunenzaubereiValue, RitualkenntnisScharlatanValue)))/3);
				SalaryLvl = High;
				incomeDice_dx = "d4";
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
				TalentValue = Math.round((HeilkundeWundenValue + HeilkundeKrankheitenValue)/2);
				SalaryLvl = High;
				incomeDice_dx = "d4";
				lowerSO = 7;
				upperSO = 12;
				legal = 1;
				break;
			case 84: 
				Job = "Schwertmeister*in";
				TalentValue = Math.round((2*KriegskunstValue + LehrenValue + 2*(Math.max(AnderthalbhaenderValue, FechtwaffenValue, SaebelValue, SchwerterValue, ZweihandschwertersaebelValue)))/5);
				SalaryLvl = High;
				incomeDice_dx = "d4";
				lowerSO = 10;
				upperSO = 14;
				legal = 1;
				break;
			case 85: 
				Job = "Söldnerführer*in";
				TalentValue = Math.round((2*KriegskunstValue + (Math.max(AnderthalbhaenderValue, FechtwaffenValue, HiebwaffenValue, InfanteriewaffenValue, KettenwaffenValue, SaebelValue, SchwerterValue, SpeereValue, StaebeValue, ZweihandflegelValue, ZweihandHiebwaffenValue, ZweihandschwertersaebelValue, ArmbrustValue, BogenValue, WurfspeerValue)))/3);
				incomeDice_dx = "d4";
				lowerSO = 7;
				upperSO = 12;
				legal = 1;
				break;
			case 99:
				Job = "kein Job";
				TalentValue = 0;
				SalaryLvl = None;
				incomeDice_dx = "d4";
				lowerSO = 0;
				upperSO = 99;
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
		
	//Roll the dice
		JobtimeDice_dx = "d4";
		JobtimeDice = String(Time) + JobtimeDice_dx;
		JobtimeRoll = new Roll(JobtimeDice).roll({async:true})
		JobtimeRoll.then(roll =>{
			let JobtimeResult = (Time * 2) + roll.total;
		incomeDice = String(JobtimeResult) + incomeDice_dx;
		incomeRoll = new Roll(incomeDice).roll({async: true});
		incomeRoll.then(roll =>{
			let incomeResult = roll.total;
		illegalDice = "1d20";
		illegalRoll = new Roll(illegalDice).roll({async:true})
		illegalRoll.then(roll =>{
			let illegalResult = roll.total;
		bustedDice = "1d20";
		bustedRoll = new Roll(bustedDice).roll({async:true})
		bustedRoll.then(roll =>{
			let bustedResult = roll.total;


	//Wird der Held bei einer illegalen Tat ertappt?
		Caught = 20 - Math.round(TalentValue/2) - Math.round(SozialstatusValue/2);
		Deposit = SozialstatusValue * 10;

	//Berechnung der Wochen und Arbeitstage:
		if(JobtimeResult === 1){
			UnitDay = " Tag ";
		}else{
			UnitDay = " Tage ";
		}
		if(Time === 1){
			UnitWeek = " Woche";
		}else{
			UnitWeek = " Wochen";
		}
		
	//Einfluss der Talentwertes auf den Lohn
		if(TalentValue >= 7 && TalentValue <= 12){
			TaWmod = 1;
		}if(TalentValue < 7){
			TaWmod = 1 - ((7 - TalentValue)/4);
		}if(TalentValue > 12){
			TaWmod = 1 + ((TalentValue - 12)/4);
		}
		
	//Einfluss eines unpassenden Sozialstatus auf den Lohn
		if(SozialstatusValue >= lowerSO && SozialstatusValue <= upperSO){
			SOmod = 1;
		}if(SozialstatusValue < lowerSO){
			SOmod = 1 - ((lowerSO - SozialstatusValue)/10);
		}if(SozialstatusValue > upperSO){
			SOmod = 1 + ((SozialstatusValue - upperSO)/10);
		}
		
	//Berechnung des Einkommens nach Einkommenslevel
		if(SalaryLvl === Low){
			Income = incomeResult;
		}if(SalaryLvl === Mid){
			Income = incomeResult*10;
		}if(SalaryLvl === Upper){
			Income = Upper + ((incomeResult - 1)*10);
		}if(SalaryLvl === High){
			Income = incomeResult*100;
		}if(SalaryLvl === None){
			Income = 0;
		}
		
	//Berechnung des Lohns
		if((TalentValue < 4) || ((legal === 0) && (illegalResult < Caught))){
			FinalSalary = None;
		}else{
			FinalSalary =  Math.round(TaWmod * SOmod * Income);
		}

	//Umrechnung in Dukaten, Silber, Heller:
		Dukaten = Math.floor(FinalSalary/100);
		Silber = Math.floor((FinalSalary/10) - (Dukaten*10));
		Heller = Math.floor(FinalSalary - (Silber*10) - (Dukaten*100));
		
	//Berechnung des Netto-Einkommens abzüglich der Lebenshaltungskosten
		Netto = FinalSalary - (Time * totalcosts);
		NettoDukaten = Math.floor(Netto/100);
		NettoSilber = Math.floor((Netto/10) - (NettoDukaten*10));
		NettoHeller = Math.floor(Netto - (NettoSilber*10) - (NettoDukaten*100));

	//Chat Output
		flavor = "<b> Zwischen den Abenteuern </b>" + hr;
		if(selectJob === 99){
			flavor += "<b>" + tokenName + "</b> geht keiner Arbeit nach <br>";
		}else{
			flavor += "In " + Time + UnitWeek + " arbeitet <b>" + tokenName + "</b> " + JobtimeResult + UnitDay + "als <b>" + Job + "</b>:<br>"
		}
		flavor += "(Lohn/Lebensstiel/Differenz)<br>"
		flavor += Dukaten + " / -" + (Time * costsDukaten) + " /   <b>" + NettoDukaten + "</b> Dukaten<br>";
		flavor += Silber + " / -" + (Time * costsSilber) + " /   <b>" + NettoSilber + "</b> Silber<br>";
		flavor += Heller + " / -" + (Time * costsHeller) + " /   <b>" + NettoHeller + "</b> Heller<br>";
		flavor += "Talentwert: " + TalentValue + "<br>";
//		flavor += "FinalSalary: " + FinalSalary + "<br>";						//Test, ob Skript funktioniert
		flavor += "TaWmod: " + TaWmod + "<br>";						//Test, ob Skript funktioniert
		flavor += "SOmod: " + SOmod + "<br>";							//Test, ob Skript funktioniert
//		flavor += "incomeResult: " + incomeResult + "<br>";						//Test, ob Skript funktioniert
//		flavor += "Lohnstufe: " + SalaryLvl + "<br>";							//Test, ob Skript funktioniert
//		flavor += "illegalResult: " + illegalResult + "/" + Caught + "<br>";	//Test, ob Skript funktioniert
//		flavor += "bustedResult: " + bustedResult + "<br>";						//Test, ob Skript funktioniert
//		flavor += "Sozialstatus: " + SozialstatusValue + "<br>";				//Test, ob Skript funktioniert
		if((legal === 0) && (illegalResult < Caught)){
			if(bustedResult === 20){
				flavor += "<b>" + tokenName + "</b> wird bei der Tat erwischt und eingesperrt. Die Kaution beträgt " + Deposit + " Dukaten.";
			}else{
				flavor += "<b>" + tokenName + "</b> wird bei der Tat erwischt";
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
