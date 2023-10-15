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

	//Sonderfertigkeiten
		const Kraftkontrolle = token.actor.items.find(item => item.name === "Kraftkontrolle");																										//Suche nach der Sonderfertigkeit "Kraftkontrolle"
		const KraftkontrolleValue = (Kraftkontrolle === undefined)? 0 : (Kraftkontrolle.system.value === null)? 0 : 1;

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
	//Rune erschaffen
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br>stellt eine Rune her " + "</h2>";
    inputDialog = headerDialog;
	inputDialog += divFlexStart + "Ritualkenntnis: Runenzauberei<input id='RkWInput'" + divInputNumber  + "0'/>" + divFlexEnd;
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectRune">Rune:</label>
                 <select name="SelectRune" id="SelectRune" style="float:right">
                    <option value="0">Felsenrune</option>
                    <option value="1">Friedensrune</option>
                    <option value="2">Windrune</option>
					<option value="3">Wogensturmrune</option>
                 </select>
            </form>
        `+ divFlexEnd	
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="talentSelect">Handwerkstalent:</label>
                 <select name="talentSelect" id="talentSelect" style="float:right">
                    <option value="0">Feinmechanik</option>
                    <option value="1">Holzbearbeitung</option>
                    <option value="2">Malen/Zeichnen</option>
					<option value="3">Schneidern</option>
					<option value="4">Steinmetz</option>
					<option value="5">Tatowieren</option>
					<option value="6">Webkunst</option>
                 </select>
            </form>
        `+ divFlexEnd	    
	inputDialog += divFlexStart + "TaP zurückhalten: <input id='holdTaP'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + "Meisterhandwerk: <input id='mhw'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkTS">passende Talentspezialisierung</label><input type="checkbox" id="checkTS" name="checkTS" style="float:right">
        `+ divFlexEnd + hr;
	inputDialog += divFlexStart + `
            <label for="checkTaWboost">TaW* für die Aktivierungsprobe verwenden?</label><input type="checkbox" id="checkTaWboost" name="checkTaWboost" style="float:right">
        `+ divFlexEnd + hr;		
//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Herstellung einer Rune",
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
		const holdTaPMod = Number(html.find("#holdTaP")[0]?.value || 0);								//TaP zurückhalten
        const mhwInput = Number(html.find("#mhw")[0]?.value || 0);										//Meisterhandwerk
		const SelectRuneInput = Number(html.find("#SelectRune")[0]?.value || 0);						//Rune auswählen
		const SelectTalentInput = Number(html.find("#talentSelect")[0]?.value || 0);					//Talent auswählen
		const RkWValue = Number(html.find("#RkWInput")[0]?.value || 0);									//Ritualkenntnis: Runenzauberei		
		
		//Checkboxes
		const checkTSInput = html.find("#checkTS")[0].checked;											//passende Talentspezialisierung
				checkTSMod = (checkTSInput === true)? 2 : 0;											//Zuweisen eines Wertes für aktivierte Checkbox

		
		//Dropdown
		switch(SelectRuneInput){
            case 0:
                complexity = 6;
				nameRune = "Felsenrune"
				RuneOutput = "Wundschwelle: +";
				break;
            case 1:
                complexity = 5;	
				nameRune = "Friedensrune"
				RuneOutput = "Jähzorn, Rachsucht und andere schlechte Eigenschaften: -";
				break;
            case 2:
                complexity = 6;			
				nameRune = "Windrune"
				RuneOutput = "Geschwindigkeit: +";
				break;
			case 3:
                complexity = 6;		
				nameRune = "Wogensturmrune"
				RuneOutput = "Schwimmen, Boote fahren, Seefahrt: +";
				break;
        }

		//Roll the dice
        let spellRoll = new Roll("6d20").roll({async: true});
        spellRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;
			let w4 = roll.terms[0].results[3].result;
			let w5 = roll.terms[0].results[4].result;
			let w6 = roll.terms[0].results[5].result;

		switch(SelectTalentInput){
            case 0:
                Att1 = cleverness;
				Att2 = dexterity;
				Att3 = dexterity;				
				Eigenschaft1 = "<b>MU</b>";
				Eigenschaft2 = "<b>FF</b>";
				Eigenschaft3 = "<b>FF</b>";
				Craft = "Feinmechanik";
				Procedure = " baut";
				break;
            case 1:
                Att1 = cleverness;
				Att2 = dexterity;				
				Att3 = strength;				
				Eigenschaft1 = "<b>KL</b>";
				Eigenschaft2 = "<b>FF</b>";
				Eigenschaft3 = "<b>KK</b>";
				Craft = "Holzbearbeitung";
				Procedure = " schnitzt";
				break;
            case 2:
                Att1 = cleverness;
				Att2 = intuition;
				Att3 = dexterity;
				Eigenschaft1 = "<b>KL</b>";
				Eigenschaft2 = "<b>IN</b>";
				Eigenschaft3 = "<b>FF</b>";
				Carft = "Malen/Zeichnen";
				Procedure = " malt/zeichnet";
				break;
			case 3:
                Att1 = cleverness;
				Att2 = dexterity;
				Att3 = dexterity;
				Eigenschaft1 = "<b>KL</b>";
				Eigenschaft2 = "<b>FF</b>";
				Eigenschaft3 = "<b>FF</b>";
				Craft = "Schneidern";
				Procedure = " schneidert";
				break;
			case 4:
                Att1 = dexterity;
				Att2 = dexterity;
				Att3 = strength;
				Eigenschaft1 = "<b>FF</b>";
				Eigenschaft2 = "<b>FF</b>";
				Eigenschaft3 = "<b>KK</b>";
				Craft = "Steinmetz";
				Procedure = " baut";
				break;	
			case 5:
                Att1 = intuition;
				Att2 = dexterity;
				Att3 = dexterity;
				Eigenschaft1 = "<b>IN</b>";
				Eigenschaft2 = "<b>FF</b>";
				Eigenschaft3 = "<b>FF</b>";
				Craft = "Tätowieren";
				Procedure = " tätowiert";
				break;
			case 6:
                Att1 = dexterity;
				Att2 = dexterity;
				Att3 = strength;
				Eigenschaft1 = "<b>FF</b>";
				Eigenschaft2 = "<b>FF</b>";
				Eigenschaft3 = "<b>KK</b>";
				Craft = "Webkunst";
				Procedure = " webt";
				break;
			}

		//Handwerkstalent
			Talent = token.actor.items.find(item => item.name === Craft);																					//Suche nach dem Talent, das in dem switch(SelectTalentInput) als Craft definiert wurde
			TalentValue = (Talent === undefined)? isNaN : (Talent.system.value === null)? 0 : Talent.system.value;											//Abrufen des TaW des entsprechenden Talents
		
		TaW = TalentValue;
			fail = " die Handwerksprobe misslingt";
            win = Procedure + " eine " + nameRune;

			mod = complexity - holdTaPMod - (mhwInput*2)
			modOutput = (mod >=0)? "+" + mod: mod;

			eTaW = TaW + checkTSMod;
			eTaWMod = eTaW + mod;
			resOne = Att1 - w1;
			resOne += (eTaWMod < 0)? eTaWMod: 0;
			resTwo = Att2 - w2;
			resTwo += (eTaWMod < 0)? eTaWMod: 0;
			resThree = Att3 - w3;
			resThree += (eTaWMod < 0)? eTaWMod: 0;
			talentResult = (eTaWMod > 0)? eTaWMod : 0;
			talentResult += (resOne < 0)? resOne : 0;
			talentResult += (resTwo < 0)? resTwo : 0;
			talentResult += (resThree < 0)? resThree : 0;
			talentResult = (talentResult == 0)? 1 : talentResult;
			talentResult = Math.min(talentResult,eTaW);
			
			luck = (talentResult >= 0)? "Erfolg":"Misserfolg";
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
			
		RkW = RkWValue;
			fail2 = ", kann diese aber nicht aktivieren.";
			win2 = " und aktiviert diese.";

			const checkTaWboostInput = html.find("#checkTaWboost")[0].checked;																				//TaP* für die Verbesserung der Aktivierungsprobe verwenden
				checkTaWboostMod = (checkTaWboostInput === true)? (Math.round(talentResult/3)) : 0;															//Zuweisen eines Wertes für aktivierte Checkbox

			mod2 = 0
			modOutput2 = (mod2 >=0)? "+" + mod2: mod2;

			eRkW = RkW + checkTaWboostMod;
			eRkWMod = eRkW + mod2;
			resFour = cleverness - w4;
			resFour += (eRkWMod < 0)? eRkWMod: 0;
			resFive = intuition - w5;
			resFive += (eRkWMod < 0)? eRkWMod: 0;				
			resSix = dexterity - w6;
			resSix += (eRkWMod < 0)? eRkWMod: 0;
			ritualResult = (eRkWMod > 0)? eRkWMod : 0;
			ritualResult += (resFour < 0)? resFour : 0;
			ritualResult += (resFive < 0)? resFive : 0;
			ritualResult += (resSix < 0)? resSix : 0;
			ritualResult = (ritualResult == 0)? 1 : ritualResult;
			ritualResult = Math.min(ritualResult,eRkW);

            luck2 = (ritualResult >= 0)? "Erfolg":"Misserfolg";
            wSum5 = w4 + w5
            wSum6 = w4 + w6
            wSum7 = w5 + w6
            wSum8 = w4 + w5 + w6
            if(wSum5 == 2 || wSum6 == 2 || wSum7 == 2){
                if(wSum8 == 3){
                    luck2 = "Spektakulärer Erfolg";
                }else{
                    luck2 = "Glücklicher Erfolg";
                };
            };
            if(wSum5 == 40 || wSum6 == 40 || wSum7 == 40){
                if(wSum8 == 60){
                    luck2 = "Spektakulärer Patzer";
                }else{
                    luck2 = "Patzer";
                };
            };

			Time = Math.round((complexity * 2) * (2/3));
			Time2 = Math.round((complexity * 2) * (1/3));
			AsPcosts = Math.round((complexity * 3) - KraftkontrolleValue) + mhwInput; 

			if(talentResult < 0){
				failOut = fail;
			}else{
				failOut = win;
			}

			if(ritualResult < 0){
				failOut2 = fail2;
				aspUpdate = astralEnergy - Math.round(AsPcosts/2);
				token.actor.update({'system.base.resources.astralEnergy.value':aspUpdate});
			}else{
				failOut2 = win2;
				aspUpdate = astralEnergy - AsPcosts;
				token.actor.update({'system.base.resources.astralEnergy.value':aspUpdate});
			}

			if(SelectRuneInput === 0){
				RuneOutput2 = 1 + Math.round(ritualResult/5);
			}if(SelectRuneInput === 1){
				RuneOutput2 = 1 + Math.round(ritualResult/3);
			}if(SelectRuneInput === 2){
				RuneOutput2 = 1 + Math.round(ritualResult/6);				
			}if(SelectRuneInput === 3){
				RuneOutput2 = 1 + Math.round(ritualResult/5);			
			}

			//Chat Output
            flavor = "<b> Erstellung einer Rune </b>";
			flavor += "<br>" + Eigenschaft1 + ": " + w1 + "/" + "<b>" + Att1 + "</b>" + " (" + resOne + ")";
			flavor += "<br>" + Eigenschaft2 + ": " + w2 + "/" + "<b>" + Att2 + "</b>" + " (" + resTwo + ")";
			flavor += "<br>" + Eigenschaft3 + ": " + w3 + "/" + "<b>" + Att3 + "</b>" + " (" + resThree + ")";
            flavor += "<br>TaW / Modifikation: " + eTaW + " / " + modOutput;
            flavor += "<br>TaP*: " + talentResult + " (" + luck + ")";
			flavor += "<br>Dauer: " + Time + " Stunden" + hr;
			if(talentResult > 0){
				flavor += "<b> Aktivierung der Rune </b>"
				flavor += "<br><b>KL</b>: " + w4 + "/" + "<b>" + cleverness + "</b>" + " (" + resFour + ")";
				flavor += "<br><b>IN</b>: " + w5 + "/" + "<b>" + intuition + "</b>" + " (" + resFive + ")";
				flavor += "<br><b>FF</b>: " + w6 + "/" + "<b>" + dexterity + "</b>" + " (" + resSix + ")";
				flavor += "<br>RkW: " + eRkW + " / " + modOutput2;
				flavor += "<br>RkP*: " + ritualResult + " (" + luck2 + ")";
				flavor += "<br>Dauer: " + Time2 + " Stunden";
				if(ritualResult > 0){
					flavor += "<br>Kosten: " + AsPcosts + " AsP";
				}else{
					flavor += "<br>Kosten: " + Math.round(AsPcosts/2) + " AsP";
				}
				flavor += "<br>" + hr;
				flavor += "<b>" + tokenName + "</b>" + failOut + " (<b>" + Craft + "</b>)" + failOut2 + hr;
				if(ritualResult > 0){
					flavor += "<b>" + nameRune + ":</b>";
					flavor += "<br>" + RuneOutput + RuneOutput2 + "</br>";
				}
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
