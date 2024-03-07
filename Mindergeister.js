//Skript für die Entstehung von elementaren Mindergeistern (nach WdZ, EG)
//Hausregel: Bei der Entstehung von Mindergeistern hat der Magier die Chance, den Mindergeist zu kontrollieren, um keinen Nachteil zu erhalten. Analog zur Kontrollprobe aus Beschwörungszaubern wird ein W20 Wurf auf einen Kontrollwert aus (MU/IN/CH/CH)/4 modifiziert um Merkmalskenntnis/Begabung abgelegt. Geling die Kontrollprobe bleibt der Mindergeist friedlich und stört den Zaubernden nicht, missling die sind alle Proben um 1 Punkt erschwert, bei einer 20 greift der Mindergeist sogar an.

main();
async function main() {
   
	
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

	//Vor und Nachteile des Helden
		const Affinity = token.actor.items.find(item => item.name === "Affinität zu  Elementaren");
		const AffinityMod = (Affinity === undefined)? 0 : 3;
		const BGFire = token.actor.items.find(item => item.name === "Begabung für  Elementar (Feuer)");
		const BGFireMod = (BGFire === undefined)? 0 : 2;
		const BGWater = token.actor.items.find(item => item.name === "Begabung für  Elementar (Wasser)");
		const BGWaterMod = (BGWater === undefined)? 0 : 2;
		const BGHumus = token.actor.items.find(item => item.name === "Begabung für  Elementar (Humus)");
		const BGHumusMod = (BGHumus === undefined)? 0 : 2;
		const BGIce = token.actor.items.find(item => item.name === "Begabung für  Elementar (Eis)");
		const BGIceMod = (BGIce === undefined)? 0 : 2;
		const BGOre = token.actor.items.find(item => item.name === "Begabung für  Elementar (Erz)");
		const BGOreMod = (BGOre === undefined)? 0 : 2;
		const BGAir = token.actor.items.find(item => item.name === "Begabung für  Elementar (Luft)");
		const BGAirMod = (BGAir === undefined)? 0 : 2;
		const MinorGhosts = token.actor.items.find(item => item.name === "Lästige Mindergeister");
		const MinorGhostsMod = (MinorGhosts === undefined)? 0 : 6;

	//Sonderfertigkeiten des Helden
		const MKFire = token.actor.items.find(item => item.name === "Merkmalskenntnis: Elementar (Feuer)");
		const MKFireMod = (MKFire === undefined)? 0 : (MKFire.system.value === null)? 0 : 2;
		const MKWater = token.actor.items.find(item => item.name === "Merkmalskenntnis: Elementar (Wasser)");
		const MKWaterMod = (MKWater === undefined)? 0 : (MKWater.system.value === null)? 0 : 2;
		const MKHumus = token.actor.items.find(item => item.name === "Merkmalskenntnis: Elementar (Humus)");
		const MKHumusMod = (MKHumus === undefined)? 0 : (MKHumus.system.value === null)? 0 : 2;
		const MKIce = token.actor.items.find(item => item.name === "Merkmalskenntnis: Elementar (Eis)");
		const MKIceMod = (MKIce === undefined)? 0 : (MKIce.system.value === null)? 0 : 2;
		const MKOre = token.actor.items.find(item => item.name === "Merkmalskenntnis: Elementar (Erz)");
		const MKOreMod = (MKOre === undefined)? 0 : (MKOre.system.value === null)? 0 : 2;
		const MKAir = token.actor.items.find(item => item.name === "Merkmalskenntnis: Elementar (Luft)");
		const MKAirMod = (MKAir === undefined)? 0 : (MKAir.system.value === null)? 0 : 2;

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
	headerDialog = "<h2><b> Entstehung von Mindergeistern </b><br></h2>";
    inputDialog = headerDialog;
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectElement">vorherrschendes Element: </label>
                 <select name="SelectElement" id="SelectElement" style="float:right">
                    <option value="0">des Feuers</option>
                    <option value="1">des Wassers</option>
                    <option value="2">des Humus</option>
					<option value="3">des Eises</option>
                    <option value="4">des Erzes </option>
                    <option value="5">der Luft</option>
                 </select>
            </form>
        `+ divFlexEnd	
	inputDialog += divFlexStart + "eingesetzte AsP <input id='usedAsP'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkNaturalForce">an einem Ort natürlicher elementarer Kraft (Wasserfall, Vulkan, Gletscher...)</label><input type="checkbox" id="checkNaturalForce" name="checkNaturalForce" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkelementalLine">an einer elementaren Kraftlinie</label><input type="checkbox" id="checkelementalLine" name="checkelementalLine" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkNodix">an einem elementaren Heiligtum oder Kraftlinien-Nodix</label><input type="checkbox" id="checkNodix" name="checkNodix" style="float:right">
        `+ divFlexEnd + hr;		

//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Entstehung von Mindergeistern",
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
		const elementInput = Number(html.find("#SelectElement")[0]?.value || 0);		//Auswahl des Elements
		const AsPcosts = Number(html.find("#usedAsP")[0]?.value || 0);					//eingesetzte AsP
		const reduceAsPInput = Number(html.find("#reduceAsP")[0]?.value || 0);			//AsP Kosten einsparen
		
		//Checkboxes
		const checkNaturalForceInput = html.find("#checkNaturalForce")[0].checked;		//an einem Ort natürlicher elementarer Kraft (Wasserfall, Vulkan, Gletscher...)
				NaturalForceMod = (checkNaturalForceInput === true)? 2 : 0;				//Zuweisen eines Wertes für aktivierte Checkbox
		const checkelementalLineInput = html.find("#checkelementalLine")[0].checked;	//Nachteil: Lästige Mindergeister
				checkelementalLineMod = (checkelementalLineInput === true)? 3 : 0;		//Zuweisen eines Wertes für aktivierte Checkbox
		const checkNodixInput = html.find("#checkNodix")[0].checked;					//an einem Ort natürlicher elementarer Kraft (Wasserfall, Vulkan, Gletscher...)
				checkNodixMod = (checkNodixInput === true)? 6 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox

		
		//Dropdown
		switch(elementInput){
            case 0:
				Elementargeist = " <b>des Feuers</b>";
				PrimeElement = " <b>Feuer</b>";
				GiftMod = Math.max(MKFireMod, BGFireMod);
				AntiGiftMod = Math.max(MKWaterMod, BGWaterMod);
				INImod = 1;
				PAmod = 0;
				LePmod = 0;
				RSmod = 0;
				ATmod = 1;
				TPmod = 2;
				GSmod = 1;
				MRmod = 1;
				GWmod = 1;
				addAtribute1 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Feuer (2W6 TP, 3 Schritt), Aura (Feuer), Durch Feuer gehen, Elementarer Griff (Flammenhand), Elementarer Biss (Glühende Zähne), Glut, Kochendes Blut, Langer Arm, Rauch, Regeneration I, Zerbersten";
				break;
            case 1:
				Elementargeist = " <b>des Wassers</b>";
				PrimeElement = " <b>Wasser</b>";
				GiftMod = Math.max(MKWaterMod, BGWaterMod);
				AntiGiftMod = Math.max(MKFireMod, BGFireMod);
				INImod = 1;
				PAmod = 1;
				LePmod = 2;
				RSmod = 0;
				ATmod = 0;
				TPmod = 0;
				GSmod = 1;
				MRmod = 1;
				GWmod = 1;
				addAtribute1 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Wasser (2W6 TP, 3 Schritt), Aura (Wasser), Durch Wasser gehen, Elementarer Griff (Ersäufende Hand), Elementarer Biss (Nässende Wunde), Ersäufen, Formlosigkeit I, Langer Arm, Nebel, Regeneration I";
				break;
            case 2:
				Elementargeist = " <b>des Humus</b>";
				PrimeElement = " <b>Humus</b>";
				GiftMod = Math.max(MKHumusMod, BGHumusMod);
				AntiGiftMod = Math.max(MKIceMod, BGIceMod);
				INImod = 0;
				PAmod = 2;
				LePmod = 4;
				RSmod = 1;
				ATmod = 0;
				TPmod = 0;
				GSmod = 0;
				MRmod = 0;
				GWmod = 1;
				addAtribute1 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Humus (2W6 TP, 3 Schritt), Aura (Dornen), Durch Humus gehen, Elementarer Griff (Ranken), Elementarer Biss (Gift), Langer Arm, Lebenssinn, Regeneration I, Steinhaut, Versinken, Wildwuchs, Zerschellender Panzer";
				break;
			case 3:
				Elementargeist = " <b>des Eises</b>";
				PrimeElement = " <b>Eis</b>";
				GiftMod = Math.max(MKIceMod, BGIceMod);
				AntiGiftMod = Math.max(MKHumusMod, BGHumusMod);
				INImod = 0;
				PAmod = 1;
				LePmod = 2;
				RSmod = 1;
				ATmod = 0;
				TPmod = 1;
				GSmod = 0;
				MRmod = 2;
				GWmod = 1;
				addAtribute1 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Eis (2W6 TP, 3 Schritt), Aura (Frost), Durch Eis gehen, Elementarer Griff (Kältegriff), Elementarer Biss (Frostbiss), Langer Arm, Regeneration I, Zerbersten";
				break;
            case 4:
				Elementargeist = " <b>des Erzes</b>";
				PrimeElement = " <b>Erz</b>";
				GiftMod = Math.max(MKOreMod, BGOreMod);
				AntiGiftMod = Math.max(MKAirMod, BGAirMod);
				INImod = 0;
				PAmod = 1;
				LePmod = 2;
				RSmod = 2;
				ATmod = 0;
				TPmod = 1;
				GSmod = 0;
				MRmod = 1;
				GWmod = 1;
				addAtribute1 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Erz (2W6 TP, 3 Schritt), Aura (Fräsender Sand), Durch Erz gehen, Elementarer Biss (Stahlgebiss), Elementarer Griff (Eiserne Klammer), Glut, Langer Arm, Regeneration I, Steinhaut, Zerbersten, Zerschellender Panzer";			
				break;
            case 5:
				Elementargeist = " <b>der Luft</b>";
				PrimeElement = " <b>Luft</b>";
				GiftMod = Math.max(MKAirMod, BGAirMod);
				AntiGiftMod = Math.max(MKOreMod, BGOreMod);
				INImod = 2;
				PAmod = 1;
				LePmod = 0;
				RSmod = 0;
				ATmod = 1;
				TPmod = 0;
				GSmod = 2;
				MRmod = 0;
				GWmod = 1;
				addAtribute1 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Luft (2W6 TP, 3 Schritt),Aura (Wind), Durch Luft gehen, Luft-Griff/Biss, Formlosigkeit I, Formlosigkeit II, Langer Arm, Nebel, Rauch, Regeneration I";
				break;
        }
		//Basiswerte eines elementaren Mindergeistes
				INIbasis = 6;	//+1d6
				PAbasis = 6;
				LePbasis = 0;	//2d6
				RSbasis = 0;
				ATbasis = 10;
				TPbasis = 0;	//1d6 + 1
				GSbasis = 6;
				MRbasis = 6;
				GWbasis = 6;


		//Roll the dice
        let spellRoll = new Roll("2d20").roll({async: true});
        spellRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
		SecElementDice = "1d6";
        SecElementRoll = new Roll(SecElementDice).roll({async:true})
        SecElementRoll.then(roll =>{
			let w3 = roll.total;
		ElementStrenghtDice = "1d6";
        ElementStrenghtRoll = new Roll(ElementStrenghtDice).roll({async:true})
        ElementStrenghtRoll.then(roll =>{
			let w4 = roll.total;


			//Berechnung der Stärke des Mindergeistes
			StrengthMinorGhostRoll = w4 + Math.round(AsPcosts/12) + (NaturalForceMod/2) + (checkelementalLineMod*2/3) + (checkNodixMod/2)
			if(StrengthMinorGhostRoll < 1){
				StrengthMinorGhost = 1;
			}else{
				StrengthMinorGhost = StrengthMinorGhostRoll;
			}

			//Auswahl des Sekundärelements
			if(w3 === 1){
				SecElement = " <b>Feuer</b>";
				INImod2 = 1;
				PAmod2 = 0;
				LePmod2 = 0;
				RSmod2 = 0;
				ATmod2 = 1;
				TPmod2 = 2;
				GSmod2 = 1;
				MRmod2 = 1;
				GWmod2 = 1;
				addAtribute2 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Feuer (2W6 TP, 3 Schritt), Aura (Feuer), Durch Feuer gehen, Elementarer Griff (Flammenhand), Elementarer Biss (Glühende Zähne), Glut, Kochendes Blut, Langer Arm, Rauch, Regeneration I, Zerbersten";
			}if(w3 === 2){
				SecElement = " <b>Wasser</b>";
				INImod2 = 1;
				PAmod2 = 1;
				LePmod2 = 2;
				RSmod2 = 0;
				ATmod2 = 0;
				TPmod2 = 0;
				GSmod2= 1;
				MRmod2 = 1;
				GWmod2 = 1;
				addAtribute2 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Wasser (2W6 TP, 3 Schritt), Aura (Wasser), Durch Wasser gehen, Elementarer Griff (Ersäufende Hand), Elementarer Biss (Nässende Wunde), Ersäufen, Formlosigkeit I, Langer Arm, Nebel, Regeneration I";
			}if(w3 === 3){
				SecElement = " <b>Humus</b>";
				INImod2 = 0;
				PAmod2 = 2;
				LePmod2 = 4;
				RSmod2 = 1;
				ATmod2 = 0;
				TPmod2 = 0;
				GSmod2 = 0;
				MRmod2 = 0;
				GWmod2 = 1;
				addAtribute2 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Humus (2W6 TP, 3 Schritt), Aura (Dornen), Durch Humus gehen, Elementarer Griff (Ranken), Elementarer Biss (Gift), Langer Arm, Lebenssinn, Regeneration I, Steinhaut, Versinken, Wildwuchs, Zerschellender Panzer";
			}if(w3 === 4){
				SecElement = " <b>Eis</b>";
				INImod2 = 0;
				PAmod2 = 1;
				LePmod2 = 2;
				RSmod2 = 1;
				ATmod2 = 0;
				TPmod2 = 1;
				GSmod2 = 0;
				MRmod2 = 2;
				GWmod2 = 1;	
				addAtribute2 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Eis (2W6 TP, 3 Schritt), Aura (Frost), Durch Eis gehen, Elementarer Griff (Kältegriff), Elementarer Biss (Frostbiss), Langer Arm, Regeneration I, Zerbersten";
			}if(w3 === 5){
				SecElement = " <b>Erz</b>";
				INImod2 = 0;
				PAmod2 = 1;
				LePmod2 = 2;
				RSmod2 = 2;
				ATmod2 = 0;
				TPmod2 = 1;
				GSmod2 = 0;
				MRmod2 = 1;
				GWmod2= 1;
				addAtribute2 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Erz (2W6 TP, 3 Schritt), Aura (Fräsender Sand), Durch Erz gehen, Elementarer Biss (Stahlgebiss), Elementarer Griff (Eiserne Klammer), Glut, Langer Arm, Regeneration I, Steinhaut, Zerbersten, Zerschellender Panzer";			
			}if(w3 === 6){
				SecElement = " <b>Luft</b>";
				INImod2 = 2;
				PAmod2 = 1;
				LePmod2 = 0;
				RSmod2 = 0;
				ATmod2 = 1;
				TPmod2 = 0;
				GSmod2 = 2;
				MRmod2 = 0;
				GWmod2 = 1;
				addAtribute2 = "<b>1</b> Attribut aus der Liste: <br>Angriff mit Luft (2W6 TP, 3 Schritt),Aura (Wind), Durch Luft gehen, Luft-Griff/Biss, Formlosigkeit I, Formlosigkeit II, Langer Arm, Nebel, Rauch, Regeneration I";

			}
		
			//Berechnung der Wahrscheinlichkeit, ob ein Mindergeist ensteht
			ProbMinorGhost = w1 + Math.round(AsPcosts/6) + MinorGhostsMod + NaturalForceMod + checkelementalLineMod + checkNodixMod
				failMinorGhost = "Kein Mindergeist erscheint";
				winMinorGhost = "Ein Mindergeist, bestehend aus " + PrimeElement + " und " + SecElement + " der Stärke " + StrengthMinorGhost + " erscheint";
			
			//Berechnung der Wertes
				INI = INIbasis + Math.round(INImod * StrengthMinorGhost/2) + Math.round(INImod2 * StrengthMinorGhost/2);	
				PA = PAbasis + Math.round(PAmod * StrengthMinorGhost/2) + Math.round(PAmod2 * StrengthMinorGhost/2);
				LeP = LePbasis + Math.round(LePmod * StrengthMinorGhost/2) + Math.round(LePmod2 * StrengthMinorGhost/2);	
				RS = RSbasis + Math.round(RSmod * StrengthMinorGhost/2) + Math.round(RSmod2 * StrengthMinorGhost/2);
				AT = ATbasis + Math.round(ATmod * StrengthMinorGhost/2) + Math.round(ATmod2 * StrengthMinorGhost/2);
				TP = TPbasis + Math.round(TPmod * StrengthMinorGhost/2) + Math.round(TPmod2 * StrengthMinorGhost/2);		
				GS = GSbasis + Math.round(GSmod * StrengthMinorGhost/2) + Math.round(GSmod2 * StrengthMinorGhost/2);
				MR = MRbasis + Math.round(MRmod * StrengthMinorGhost/2) + Math.round(MRmod2 * StrengthMinorGhost/2);
				GW = GWbasis + Math.round(GWmod * StrengthMinorGhost/2) + Math.round(GWmod2 * StrengthMinorGhost/2);
			
			
			//Berechnung des Lebenszeit von Mindergeistern - Einheit
				if(w1 === 1 || w1 === 20 || w2 === 1 || w2 === 20){
					LifetimeUnit = "SR";
				}else{
					LifetimeUnit = "KR";
				}
			
			//Berechnung der Lebenszeit und der Klasse von Mindergeistern
			if((PrimeElement === " <b>Feuer</b>" && SecElement === " <b>Feuer</b>") 
				|| (PrimeElement === " <b>Wasser</b>" && SecElement === " <b>Wasser</b>") 
				|| (PrimeElement === " <b>Humus</b>" && SecElement === " <b>Humus</b>") 
				|| (PrimeElement === " <b>Eis</b>" && SecElement === " <b>Eis</b>") 
				|| (PrimeElement === " <b>Erz</b>" && SecElement === " <b>Erz</b>") 
				|| (PrimeElement === " <b>Luft</b>" && SecElement === " <b>Luft</b>")){
					GhostClass = "Geister der ersten Ordnung (auch: Elementare Mindergeister oder Animus minor purus) bestehen nur aus einem einzigen der sechs Elemente";
					Lifetime = ProbMinorGhost * 3;
					addAtributesNo = "";
					addAtribute3 = "";
			}if((PrimeElement === " <b>Feuer</b>" && (SecElement === " <b>Humus</b>" || SecElement === " <b>Erz</b>")) 
				|| (PrimeElement === " <b>Wasser</b>" && (SecElement === " <b>Eis</b>" || SecElement === " <b>Luft</b>")) 
				|| (PrimeElement === " <b>Humus</b>" && (SecElement === " <b>Feuer</b>" || SecElement === " <b>Erz</b>")) 
				|| (PrimeElement === " <b>Eis</b>" && (SecElement === " <b>Wasser</b>" || SecElement === " <b>Luft</b>")) 
				|| (PrimeElement === " <b>Erz</b>" && (SecElement === " <b>Humus</b>" || SecElement === " <b>Feuer</b>")) 
				|| (PrimeElement === " <b>Luft</b>" && (SecElement === " <b>Eis</b>" || SecElement === " <b>Wasser</b>"))){
					GhostClass = "Geister zweiter Ordnung (auch: Gewöhnliche Mindergeister oder Animus minor vicinus) bestehen aus zwei benachbarten Elementen";
					Lifetime = ProbMinorGhost * 2;
					addAtributesNo = "";
					addAtribute3 = "";
			}if((PrimeElement === " <b>Feuer</b>" && (SecElement === " <b>Eis</b>" || SecElement === " <b>Luft</b>")) 
				|| (PrimeElement === " <b>Wasser</b>" && (SecElement === " <b>Humus</b>" || SecElement === " <b>Erz</b>")) 
				|| (PrimeElement === " <b>Humus</b>" && (SecElement === " <b>Erz</b>" || SecElement === " <b>Wasser</b>")) 
				|| (PrimeElement === " <b>Eis</b>" && (SecElement === " <b>Feuer</b>" || SecElement === " <b>Luft</b>")) 
				|| (PrimeElement === " <b>Erz</b>" && (SecElement === " <b>Humus</b>" || SecElement === " <b>Wasser</b>")) 
				|| (PrimeElement === " <b>Luft</b>" && (SecElement === " <b>Feuer</b>" || SecElement === " <b>Eis</b>"))){
					GhostClass = "Geister dritter Ordnung (auch: gewöhnliche Mindergeister oder Animus minor vulgaris) bestehen aus zwei Elementen, die neutral zueinander stehen";
					Lifetime = ProbMinorGhost;
					addAtributesNo = "";
					addAtribute3 = "";
			}if((PrimeElement === " <b>Feuer</b>" && SecElement === " <b>Wasser</b>") 
				|| (PrimeElement === " <b>Wasser</b>" && SecElement === " <b>Feuer</b>") 
				|| (PrimeElement === " <b>Humus</b>" && SecElement === " <b>Eis</b>") 
				|| (PrimeElement === " <b>Eis</b>" && SecElement === " <b>Humus</b>") 
				|| (PrimeElement === " <b>Erz</b>" && SecElement === " <b>Luft</b>") 
				|| (PrimeElement === " <b>Luft</b>" && SecElement === " <b>Erz</b>")){
					GhostClass = "Geister vierter Ordnung (auch: Furchtgeister oder Animus minor contrarius) bestehen aus zwei entgegengesetzten Elementen";
					Lifetime = ProbMinorGhost / 2;
					addAtributesNo = Math.round(StrengthMinorGhost/3);
					addAtribute3 = "Mindergeister vierter Ordnung erhalten <b>" +  addAtributesNo + "</b> der folgenden Eigenschaften: Schreckgestalt I, Ängste auslösen (Aberglaube oder je nach Element: Angst vor Feuer, Meeresangst für Wasser, Raumangst für Erz, Höhenangst für Luft, Totenangst für Eis oder Humus), Gestank, Lebensraub I, Raserei";
			}		
			
			
			if(ProbMinorGhost < 15){
				failOut = failMinorGhost;
			}else{
				failOut = winMinorGhost;
			}

			//Berechnung des Kontrollwertes
			Control = Math.round((courage + intuition + charisma + charisma)/4)	
				eControl = Control + AffinityMod + GiftMod - (AntiGiftMod * 2);
			if(w2 < eControl){
				ControlOutput = " Der Mindergeist umspielt ";
			}if(w2 === 20){
				ControlOutput = " Der Mindergeist attakiert ";
			}else{
				ControlOutput = "Der Mindergeist stört (alle Proben +1) ";
			}

		//Chat Output
            flavor = "<b> Entstehung von Mindergeistern </b><br>";
			flavor += "<b> Wurf: </b>" + ProbMinorGhost + " / " + StrengthMinorGhost + hr;
			flavor += failOut + "<br>";
			if(ProbMinorGhost > 14){
				flavor += hr + "<b>Werte des Mindergeistes:</b>";
				flavor += "<br><b> INI: </b>1W6 + </b>" + INI;
				flavor += "<b> AT: </b>" + AT;			
				flavor += "<b> PA: </b>" + PA;
				flavor += "<b> TP: </b>1W6 + </b>" + TP;				
				flavor += "<br><b> LeP: </b>2W6 + " + LeP;
				flavor += "<b> RS: </b>" + RS
				flavor += "<b> MR: </b>" + MR;
				flavor += "<b> GS: </b>" + GS;
				flavor += "<b> GW: </b>" + GW;
				flavor += "<br>" + GhostClass;
				flavor += "<br>" + addAtribute1 + "<br>" + addAtribute2 + "<br>" + addAtribute3;
				flavor += "<br> Lebenszeit: " + Lifetime + " " + LifetimeUnit + hr;
				flavor += ControlOutput + tokenName;
            }
			flavor += hr + "<u>Vor- und Nachteile</u><br>";
			if(AffinityMod === 3){
				flavor += "Affinität zu  Elementaren<br>";
			}if(BGFireMod === 2){
				flavor += "Begabung für Elementar (Feuer)<br>";
			}if(BGWaterMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Wasser)<br>";
			}if(BGHumusMod === 2){
				flavor += "Begabung für Elementar (Humus)<br>";
			}if(BGIceMod === 2){
				flavor += "Begabung für Elementar (Eis)<br>";
			}if(BGOreMod === 2){
				flavor += "Begabung für Elementar (Erz)<br>";
			}if(BGAirMod === 2){
				flavor += "Begabung für Elementar (Luft)<br>";
			}
			flavor += "<u>Sonderfertigkeiten</u><br>";
			if(MKFireMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Feuer)<br>";
			}if(MKWaterMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Wasser)<br>";
			}if(MKHumusMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Humus)<br>";
			}if(MKIceMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Eis)<br>";
			}if(MKOreMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Erz)<br>";
			}if(MKAirMod === 2){
				flavor += "Merkmalskenntnis: Elementar (Luft)<br>";
			}
			
            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode: CONST.DICE_ROLL_MODES.BLIND}
            );
        })})});
	}
}		   
