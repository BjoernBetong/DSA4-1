//Skript für die Beschwörung von Elementaren (nach WdZ, EG) - nur für Magier

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

	//Zauber des Helden
		const ElementarerDiener = token.actor.items.find(item => item.name === "Elementarer Diener");																								//Suche nach dem Zauber "Elementarer Diener"
		const ElementarerDienerValue = (ElementarerDiener === undefined)? isNaN : (ElementarerDiener.system.value === null)? 0 : ElementarerDiener.system.value;									//Abrufen des ZfW des Zaubers "Elementarer Diener"

	//Sonderfertigkeiten des Helden
		const ZSFire = token.actor.items.find(item => item.name === "Zauberspezialisierung Elementarer Diener [Magier] (Elementar (Feuer)) (Elementarer Diener)");									//Suche nach einer Zauberspezialisierung für "Elementarer Diener (Feuer)"
		const ZSFireValue = (ZSFire === undefined)? 0 : (ZSFire.system.value === null)? 0 : 2;																										//Zuweisen des ZfW Bonus für die Zauberspezialisierung
		const ZSWater = token.actor.items.find(item => item.name === "Zauberspezialisierung Elementarer Diener [Magier] (Elementar (Wasser)) (Elementarer Diener)");								//Suche nach einer Zauberspezialisierung für "Elementarer Diener (Wasser)"
		const ZSWaterValue = (ZSWater === undefined)? 0 : (ZSWater.system.value === null)? 0 : 2;																									//Zuweisen des ZfW Bonus für die Zauberspezialisierung
		const ZSHumus = token.actor.items.find(item => item.name === "Zauberspezialisierung Elementarer Diener [Magier] (Elementar (Humus)) (Elementarer Diener)");									//Suche nach einer Zauberspezialisierung für "Elementarer Diener (Humus)"
		const ZSHumusValue = (ZSHumus === undefined)? 0 : (ZSHumus.system.value === null)? 0 : 2;																									//Zuweisen des ZfW Bonus für die Zauberspezialisierung
		const ZSIce = token.actor.items.find(item => item.name === "Zauberspezialisierung Elementarer Diener [Magier] (Elementar (Eis)) (Elementarer Diener)");										//Suche nach einer Zauberspezialisierung für "Elementarer Diener (Eis)"
		const ZSIceValue = (ZSIce === undefined)? 0 : (ZSIce.system.value === null)? 0 : 2;																											//Zuweisen des ZfW Bonus für die Zauberspezialisierung
		const ZSOre = token.actor.items.find(item => item.name === "Zauberspezialisierung Elementarer Diener [Magier] (Elementar (Erz)) (Elementarer Diener)");										//Suche nach einer Zauberspezialisierung für "Elementarer Diener (Erz)"
		const ZSOreValue = (ZSOre === undefined)? 0 : (ZSOre.system.value === null)? 0 : 2;																											//Zuweisen des ZfW Bonus für die Zauberspezialisierung
		const ZSAir = token.actor.items.find(item => item.name === "Zauberspezialisierung Elementarer Diener [Magier] (Elementar (Luft)) (Elementarer Diener)");									//Suche nach einer Zauberspezialisierung für "Elementarer Diener (Luft)"
		const ZSAirValue = (ZSAir === undefined)? 0 : (ZSAir.system.value === null)? 0 : 2;																											//Zuweisen des ZfW Bonus für die Zauberspezialisierung
		const Kraftkontrolle = token.actor.items.find(item => item.name === "Kraftkontrolle");																										//Suche nach der Sonderfertigkeit "Kraftkontrolle"
		const KraftkontrolleValue = (Kraftkontrolle === undefined)? 0 : (Kraftkontrolle.system.value === null)? 0 : 1;																				//Zuweisen eines Wertes für die Einsparung von Astralenergie
		const Elementarist = token.actor.items.find(item => item.name === "Elementarist");																											//Suche nach der Sonderfertigkeit "Elementarist"
		const ElementaristValue = (Elementarist === undefined)? 0 : (Elementarist.system.value === null)? 0 : 3;																					//Zuweisen des ZfW Bonus für die Sonderfertigkeit


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
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br>beschwört einen " + "</h2>";
    inputDialog = headerDialog;
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectElement">Elementargeist:</label>
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
    inputDialog += divFlexStart + "Beschwörungsschwierigkeit: <input id='summonDiff'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + "Kontrollschwierigkeit: <input id='controlDiff'" + divInputNumber  + "0'/>" + divFlexEnd;
    inputDialog += divFlexStart + "Wahrer Name: <input id='trueName'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="ZfPboost">ZfP* für Kontrollprobe verwenden</label><input type="checkbox" id="ZfPboost" name="ZfPboost" style="float:right">
        `+ divFlexEnd + hr;
	inputDialog += "<h3><b>" + "Vor- und Nachteile" + "</b><br>" + "</h3>";
	inputDialog += divFlexStart + `
            <label for="checkAffinity">Affinität zu Elementaren</label><input type="checkbox" id="checkAffinity" name="checkAffinity" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkAntiGift">Begabung/Merkmalskenntnis (Gegenelement)</label><input type="checkbox" id="checkAntiGift" name="checkAntiGift" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkGift">Begabung/Merkmalskenntnis (gerufenes Element)</label><input type="checkbox" id="checkGift" name="checkGift" style="float:right">
        `+ divFlexEnd + hr;
	inputDialog += "<h3><b>" + "Spontane Modifikationen" + "</b><br>" + "</h3>";
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="reduceAsP">Kosten einsparen (+3 ZfP pro 10 %)</label>
                 <select name="reduceAsP" id="reduceAsP" style="float:right">
                    <option value="0">0 %</option>
                    <option value="1">10 %</option>
                    <option value="2">20 %</option>
					<option value="3">30 %</option>
                    <option value="4">40 %</option>
                    <option value="5">50 %</option>
                 </select>
            </form>
        `+ divFlexEnd	
	inputDialog += divFlexStart + `
            <label for="checkhalfTime">Halbierte Zauberdauer (mindestens 1 Aktion)</label><input type="checkbox" id="checkhalfTime" name="checkhalfTime" style="float:right">
        `+ divFlexEnd
	inputDialog += divFlexStart + `
            <label for="checkdoubledTime">Verdoppelte Zauberdauer (nur einmalig)</label><input type="checkbox" id="checkdoubledTime" name="checkdoubledTime" style="float:right">
        `+ divFlexEnd + hr;
		
//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Beschwörungsprobe",
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
		const summonDiffMod = Number(html.find("#summonDiff")[0]?.value || 0);			//Beschwörungsschwierigkeit
        const trueNameMod = Number(html.find("#trueName")[0]?.value || 0);				//Wahrer Name
		const elementInput = Number(html.find("#SelectElement")[0]?.value || 0);		//Auswahl des Elements
		const controlDiffMod = Number(html.find("#controlDiff")[0]?.value || 0);		//Kontrollschwierigkeit
		const reduceAsPInput = Number(html.find("#reduceAsP")[0]?.value || 0);			//AsP Kosten einsparen
		
		//Checkboxes
		const checkGiftInput = html.find("#checkGift")[0].checked;						//Begabung/Merkmalskenntnis (gerufenes Element)
				GiftMod = (checkGiftInput === true)? 2 : 0;								//Zuweisen eines Wertes für aktivierte Checkbox
		const checkAntiGiftInput = html.find("#checkAntiGift")[0].checked;				//Begabung/Merkmalskenntnis (Gegenelement)
				AntiGiftMod = (checkAntiGiftInput === true)? 2 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const checkAffinityInput = html.find("#checkAffinity")[0].checked;				//Affinität zu Elementaren
				AffinityMod = (checkAffinityInput === true)? 3 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const ZfPboostInput = html.find("#ZfPboost")[0].checked;						//ZfP* für Kontrollprobe verwenden
		const checkhalfTimeInput = html.find("#checkhalfTime")[0].checked;				//Halbierte Zauberdauer (mindestens 1 Aktion)
				halfTimeMod = (checkhalfTimeInput === true)? 5 : 0;						//Zuweisen eines Wertes für aktivierte Checkbox
		const checkdoubledTimeInput = html.find("#checkdoubledTime")[0].checked;		//Verdoppelte Zauberdauer (nur einmalig)
				doubledTimeMod = (checkdoubledTimeInput === true)? 3 : 0;				//Zuweisen eines Wertes für aktivierte Checkbox
		
		//Dropdown
		switch(elementInput){
            case 0:
                ZSValue = ZSFireValue;
				Elementargeist = " <b>des Feuers</b>";
				break;
            case 1:
				ZSValue = ZSWaterValue;
				Elementargeist = " <b>des Wassers</b>";
				break;
            case 2:
				ZSValue = ZSHumusValue;
				Elementargeist = " <b>des Humus</b>";
				break;
			case 3:
				ZSValue = ZSIceValue;
				Elementargeist = " <b>des Eises</b>";
				break;
            case 4:
				ZSValue = ZSOreValue;
				Elementargeist = " <b>des Erzes</b>";
				break;
            case 5:
				ZSValue = ZSAirValue;
				Elementargeist = " <b>der Luft</b>";
				break;
        }

		switch(reduceAsPInput){
            case 0:
                reductionFactor = 1;
				reduceAsPMod = 0;
				reduceAsPTime = 0;
				break;
            case 1:
				reductionFactor = 0.9;
				reduceAsPMod = 3;
				reduceAsPTime = 1;
				break;
            case 2:
				reductionFactor = 0.8;
				reduceAsPMod = 6;
				reduceAsPTime = 2;
				break;
			case 3:
				reductionFactor = 0.7;
				reduceAsPMod = 9;
				reduceAsPTime = 3;
				break;
            case 4:
				reductionFactor = 0.6;
				reduceAsPMod = 12;
				reduceAsPTime = 4;
				break;
            case 5:
				reductionFactor = 0.5;
				reduceAsPMod = 15;
				reduceAsPTime = 5;
				break;
        }
		
		//Spell
		const ZfW = ElementarerDienerValue;
		
			fail = " misslingt der Zauber";
            win = " beschwört einen <b>Elementargeist</b>";
			AsPcosts = Math.round((12 - KraftkontrolleValue) * reductionFactor); 

			mod = summonDiffMod - trueNameMod - ElementaristValue - GiftMod + AntiGiftMod - doubledTimeMod + halfTimeMod + reduceAsPMod
			modOutput = (mod >=0)? "+" + mod: mod;

		//Roll the dice
        let spellRoll = new Roll("4d20").roll({async: true});
        spellRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;
			let w4 = roll.terms[0].results[3].result;

			eZfW = ZfW + ZSValue;
			eZfWMod = eZfW - mod;
			resOne = courage - w1;
			resOne += (eZfWMod < 0)? eZfWMod: 0;
			resTwo = cleverness - w2;
			resTwo += (eZfWMod < 0)? eZfWMod: 0;
			resThree = charisma - w3;
			resThree += (eZfWMod < 0)? eZfWMod: 0;
			resFour = w4;
			spellResult = (eZfWMod > 0)? eZfWMod : 0;
			spellResult += (resOne < 0)? resOne : 0;
			spellResult += (resTwo < 0)? resTwo : 0;
			spellResult += (resThree < 0)? resThree : 0;
			spellResult = (spellResult == 0)? 1 : spellResult;
			spellResult = Math.min(spellResult,eZfW);

            luck = (spellResult >= 0)? "Erfolg":"Misserfolg";
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

			//ZfP* für Kontrollprobe verwenden
				ZfPboostMod = (ZfPboostInput === true)? Math.round(spellResult/3) : 0;		//Zuweisen eines Wertes für aktivierte Checkbox
			
			//Berechnung des Kontrollwertes
			Control = Math.round((courage + intuition + charisma + charisma + eZfW)/5)	
				eControl = Control - controlDiffMod + AffinityMod + GiftMod - (AntiGiftMod * 2) + ZfPboostMod;
					failControl = ", der von ihm aber nicht kontrolliert werden kann";
					winControl = " und kann diesen kontrollieren";

			//Berechnung der Zauberdauer (1 Aktion entsprechen 1,5 Sekunden / 1 Spielrunde entsprechen 5 Minuten (200 Aktionen))
				if(checkhalfTimeInput > 0){
					TimeMod = 0.5;
				}if(checkdoubledTimeInput > 0){
					TimeMod = 2;
				}else{
					TimeMod = 1;
				}
				TimeA = 200;
				Time = (TimeA + reduceAsPTime) * TimeMod;
				TimeSR = Time/200;
					if(TimeSR === 1){
						SROutput = " Spielrunde";
					}else{
						SROutput = " Spielrunden";
					}

			if(spellResult < 0){
				failOut = fail;
				aspUpdate = astralEnergy - (AsPcosts/2);
				token.actor.update({'system.base.resources.astralEnergy.value':aspUpdate});
			}if(spellResult > 0, resFour > eControl){
				failOut = win + Elementargeist + failControl;
				aspUpdate = astralEnergy - AsPcosts;
				token.actor.update({'system.base.resources.astralEnergy.value':aspUpdate});
			}else{
				failOut = win + Elementargeist + winControl;
				aspUpdate = astralEnergy - AsPcosts;
				token.actor.update({'system.base.resources.astralEnergy.value':aspUpdate});
			}


			//Chat Output
            flavor = "<b> Beschwörung des Elementars </b><br>";
			flavor += "MU: " + w1 + " / " + "<b>" + courage + "</b>" + " (" + resOne + ")";
			flavor += "<br>KL: " + w2 + " / " + "<b>" + cleverness + "</b>" + " (" + resTwo + ")";
			flavor += "<br>CH: " + w3 + " / " + "<b>" + charisma + "</b>" + " (" + resThree + ")";
            flavor += "<br>ZfW / Modifikation: " + eZfW + " / " + modOutput;
            flavor += "<br>ZfP*: " + spellResult + " (" + luck + ")";
			flavor += "<br>Kosten: " + "-" + AsPcosts + " AsP";
			flavor += "<br>Dauer: " + Time + " Aktionen (" + TimeSR + SROutput + ")";
			flavor += "<br>" + hr;
			flavor += "<b> Kontrolle des Elementars </b><br>";
			flavor += "Kontrollwert: " + w4 + " / " + "<b>" + eControl + "</b>";
			flavor += "<br>" + hr;
            flavor += "<b>" + tokenName + "</b>" + failOut + hr;

            
            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode}
            );
		game.macros.getName("Mindergeister").execute()
        });
	}
}		   