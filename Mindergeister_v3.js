//Skript für die Entstehung von elementaren Mindergeistern (nach WdZ, EG)

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
            <label for="checkMinorGhosts">Nachteil: Lästige Mindergeister</label><input type="checkbox" id="checkMinorGhosts" name="checkMinorGhosts" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkNaturalForce">an einem Ort natürlicher elementarer Kraft (Wasserfall, Vulkan, Gletscher...)</label><input type="checkbox" id="checkNaturalForce" name="checkNaturalForce" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkelementalLine">an einer elementaren Kraftlinie</label><input type="checkbox" id="checkelementalLine" name="checkelementalLine" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkNodix">an einem elementaren Heiligtum oder Kraftlinien-Nodix</label><input type="checkbox" id="checkNodix" name="checkNodix" style="float:right">
        `+ divFlexEnd + hr;		
	inputDialog += divFlexStart + `
            <label for="checkAffinity">Affinität zu Elementaren</label><input type="checkbox" id="checkAffinity" name="checkAffinity" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkAntiGift">Begabung/Merkmalskenntnis (Gegenelement)</label><input type="checkbox" id="checkAntiGift" name="checkAntiGift" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkGift">Begabung/Merkmalskenntnis (gerufenes Element)</label><input type="checkbox" id="checkGift" name="checkGift" style="float:right">
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
		const checkGiftInput = html.find("#checkGift")[0].checked;						//Begabung/Merkmalskenntnis (gerufenes Element)
				GiftMod = (checkGiftInput === true)? 2 : 0;								//Zuweisen eines Wertes für aktivierte Checkbox
		const checkAntiGiftInput = html.find("#checkAntiGift")[0].checked;				//Begabung/Merkmalskenntnis (Gegenelement)
				AntiGiftMod = (checkAntiGiftInput === true)? 2 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const checkAffinityInput = html.find("#checkAffinity")[0].checked;				//Affinität zu Elementaren
				AffinityMod = (checkAffinityInput === true)? 3 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const checkMinorGhostsInput = html.find("#checkMinorGhosts")[0].checked;		//Nachteil: Lästige Mindergeister
				MinorGhostsMod = (checkMinorGhostsInput === true)? 6 : 0;				//Zuweisen eines Wertes für aktivierte Checkbox
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
				INImod = 1;
				PAmod = 0;
				LePmod = 0;
				RSmod = 0;
				ATmod = 1;
				TPmod = 2;
				GSmod = 1;
				MRmod = 1;
				GWmod = 1;
				break;
            case 1:
				Elementargeist = " <b>des Wassers</b>";
				PrimeElement = " <b>Wasser</b>";
				INImod = 1;
				PAmod = 1;
				LePmod = 2;
				RSmod = 0;
				ATmod = 0;
				TPmod = 0;
				GSmod = 1;
				MRmod = 1;
				GWmod = 1;
				break;
            case 2:
				Elementargeist = " <b>des Humus</b>";
				PrimeElement = " <b>Humus</b>";
				INImod = 0;
				PAmod = 2;
				LePmod = 4;
				RSmod = 1;
				ATmod = 0;
				TPmod = 0;
				GSmod = 0;
				MRmod = 0;
				GWmod = 1;
				break;
			case 3:
				Elementargeist = " <b>des Eises</b>";
				PrimeElement = " <b>Eis</b>";
				INImod = 0;
				PAmod = 1;
				LePmod = 2;
				RSmod = 1;
				ATmod = 0;
				TPmod = 1;
				GSmod = 0;
				MRmod = 2;
				GWmod = 1;				
				break;
            case 4:
				Elementargeist = " <b>des Erzes</b>";
				PrimeElement = " <b>Erz</b>";
				INImod = 0;
				PAmod = 1;
				LePmod = 2;
				RSmod = 2;
				ATmod = 0;
				TPmod = 1;
				GSmod = 0;
				MRmod = 1;
				GWmod = 1;				
				break;
            case 5:
				Elementargeist = " <b>der Luft</b>";
				PrimeElement = " <b>Luft</b>";
				INImod = 2;
				PAmod = 1;
				LePmod = 0;
				RSmod = 0;
				ATmod = 1;
				TPmod = 0;
				GSmod = 2;
				MRmod = 0;
				GWmod = 1;
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
        let spellRoll = new Roll("4d20").roll({async: true});
        spellRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;
			let w4 = roll.terms[0].results[3].result;
			SecElementRoll = w3;

			//Berechnung der Stärke des Mindergeistes
			StrengthMinorGhostRoll = Math.round(w2*6/20) + Math.round(AsPcosts/12) + (NaturalForceMod/2) + (checkelementalLineMod*2/3) + (checkNodixMod/2)
			if(StrengthMinorGhostRoll < 1){
				StrengthMinorGhost = 1;
			}else{
				StrengthMinorGhost = StrengthMinorGhostRoll;
			}
			//Auswahl des Sekundärelements
			if(elementInput === 0 && SecElementRoll < 11){
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
			}if(elementInput === 0 && SecElementRoll > 10){
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
			}if(elementInput === 1 && SecElementRoll < 11){
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
			}if(elementInput === 1 && SecElementRoll > 10){
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
			}if(elementInput === 2 && SecElementRoll < 11){
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
			}if(elementInput === 2 && SecElementRoll > 10){
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
			}if(elementInput === 3 && SecElementRoll < 11){
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
			}if(elementInput === 3 && SecElementRoll > 10){
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
			}if(elementInput === 4 && SecElementRoll < 11){
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
			}if(elementInput === 4 && SecElementRoll > 10){
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
			}if(elementInput === 5 && SecElementRoll < 11){
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
			}if(elementInput === 5 && SecElementRoll > 10){
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
			}
				
			
			
			//Berechnung der Wahrscheinlichkeit, ob ein Mindergeist ensteht
			ProbMinorGhost = w1 + Math.round(AsPcosts/6) + MinorGhostsMod + NaturalForceMod + checkelementalLineMod + checkNodixMod
				failMinorGhost = "Kein Mindergeist erscheint";
				winMinorGhost = "Ein Elementarer Mindergeist " + Elementargeist + " der Stärke " + StrengthMinorGhost + " erscheint";
				winMinorGhost18 = "Ein Mindergeist, bestehend aus " + PrimeElement + " und " + SecElement + " der Stärke " + StrengthMinorGhost + " erscheint";
			
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
				
			
			if(ProbMinorGhost < 15){
				failOut = failMinorGhost;
			}else{
				failOut = winMinorGhost18;
			}

			//Berechnung des Kontrollwertes
			Control = Math.round((courage + intuition + charisma + charisma)/4)	
				eControl = Control + AffinityMod + GiftMod - (AntiGiftMod * 2);
			if(w4 < eControl){
				ControlOutput = " Der Mindergeist umspielt ";
			}if(w4 === 20){
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
				flavor += "<b> GW: </b>" + GW + hr;
				flavor += ControlOutput + tokenName;
            }
			
            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode}
            );
        });
	}
}		   