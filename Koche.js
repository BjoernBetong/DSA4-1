// Skript für die Kochenprobe nach WdE


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
		const Kochen = token.actor.items.find(item => item.name === "Kochen");																											//Suche nach dem Talent "Wildnisleben"
		const KochenValue = (Kochen === undefined)? isNaN : (Kochen.system.value === null)? 0 : Kochen.system.value;														//Abrufen des TaW des Talents "Wildnisleben"

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
	//Kochen in der Wildnis
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br>kocht" + "</h2>";
    inputDialog = headerDialog;
	inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectMeal">Warum wird gekocht? </label>
                 <select name="SelectMeal" id="SelectMeal" style="float:right">
                    <option value="0">Das Essen wird sofort gegessen</option>
					<option value="1">Das Essen wird haltbar gemacht: Garen</option>
                    <option value="2">Das Essen wird haltbar gemacht: Pökeln</option>
                    <option value="3">Marschrationen werden angelegt</option>					
                 </select>
            </form>
        `+ divFlexEnd
	inputDialog += divFlexStart + "Für wie viele Personen wird gekocht? <input id='PersonenInput'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + "Anzahl der Rationen <input id='RationenInput'" + divInputNumber  + "0'/>" + divFlexEnd + hr;
	inputDialog += "<b>Fleisch</b>";
	inputDialog += divFlexStart + "TaP* aus verheriger <i>Fleischer</i>-Probe: <input id='FleischerBonus'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + `
            <label for="checkZerlegt">Das Tier muss selbst zerlegt werden:</label><input type="checkbox" id="checkZerlegt" name="checkZerlegt" style="float:right">
        `+ divFlexEnd
	inputDialog += divFlexStart + `
            <label for="checkZaeh">Das Fleisch ist zäh:</label><input type="checkbox" id="checkZaeh" name="checkZaeh" style="float:right">
        `+ divFlexEnd
	inputDialog += divFlexStart + "Das Fleisch gehört zu einer dem Koch nicht bekannten Tiersorte (+1 bis +7) <input id='unbekanntesFleischMod'" + divInputNumber  + "0'/>" + divFlexEnd + hr;
	inputDialog += "<b>Gemüse, Wurzeln, Pilze und dergleichen</b>";
	inputDialog += divFlexStart + "Der Koch hat keine Erfahrung mit diesen Pflanzen oder Pflanzenteilen (+1 bis +7) <input id='unbekanntesGemueseMod'" + divInputNumber  + "0'/>" + divFlexEnd + hr;
	inputDialog += "<b>Allgemeine Modifikationen</b>";
	inputDialog += divFlexStart + `
            <label for="checkTSBackenBraten">Talentspezialisierung: <i>Backen/Braten</i></label><input type="checkbox" id="checkTSBackenBraten" name="checkTSBackenBraten" style="float:right">
        `+ divFlexEnd;
	inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectKraeuter">Kräuter und Gewürze: </label>
                 <select name="SelectKraeuter" id="SelectKraeuter" style="float:right">
                    <option value="0">Wenig Kräuter und/oder Gewürze</option>
                    <option value="1">Keine nennenswerte Auswahl</option>
                    <option value="2">Große Auswahl vorhanden</option>
                 </select>
            </form>
        `+ divFlexEnd		
	inputDialog += divFlexStart + "Die Feuerstelle ist mangelhaft oder der Feuerholzvorrat begrenzt (+1 bis +5) <input id='FeuerstelleInput'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + `
            <form action"#">
                 <label for="SelectUtensilien">Kochutensilien: </label>
                 <select name="SelectUtensilien" id="SelectUtensilien" style="float:right">
                    <option value="0">Pfanne oder Topf</option>
                    <option value="1">Kochleder</option>
                    <option value="2">Weder Pfanne/Topf noch Kochleder</option>
                 </select>
            </form>
        `+ divFlexEnd + hr
	inputDialog += "<b>Haltbarmachen</b>";
	inputDialog += divFlexStart + `
            <label for="checkTSHaltbar">Talentspezialisierung: <i>Haltbarmachen</i></label><input type="checkbox" id="checkTSHaltbar" name="checkTSHaltbar" style="float:right">
        `+ divFlexEnd
		inputDialog += divFlexStart + `
            <label for="checkTSMarsch">Talentspezialisierung: <i>Marschrationen</i></label><input type="checkbox" id="checkTSMarsch" name="checkTSMarsch" style="float:right">
        `+ divFlexEnd + hr;
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
		const FleischerBonusMod = Number(html.find("#FleischerBonus")[0]?.value || 0);								//TaP aus verheriger Fleischer-Probe
		const unbekanntesFleischMod = Number(html.find("#unbekanntesFleisch")[0]?.value || 0);						//Das Fleisch gehört zu einer dem Koch nicht bekannten Tiersorte: +1 bis +7
		const KraeuterInput = Number(html.find("#SelectKraeuter")[0]?.value || 0);									//Einlesen der WErte für das Dropdown-Menü
		const FeuerstellehMod = Number(html.find("#Feuerstelle")[0]?.value || 0);									//Die Feuerstelle ist mangelhaft oder der Feuerholzvorrat begrenzt (+1 bis +5)
		const UtensilienInput = Number(html.find("#SelectUtensilien")[0]?.value || 0);								//DWas steht zum Kochen zur Verfügung?
		const PersonenMod = Number(html.find("#PersonenInput")[0]?.value || 0);										//Für wie viele Personen wird gekocht?
		const RationenMod = Number(html.find("#RationenInput")[0]?.value || 0);										//Für wie viele Personen wird gekocht?
		const unbekanntesGemueseMod = Number(html.find("#unbekanntesGemuese")[0]?.value || 0);						//Der Koch hat keine Erfahrung mit diesen Pflanzen oder Pflanzenteilen (+1 bis +7)
		const MealInput = Number(html.find("#SelectMeal")[0]?.value || 0);											//Warum wird gekocht?
		
		//Checkboxes
		const checkZerlegtInput = html.find("#checkZerlegt")[0].checked;											//Das Tier muss selbst zerlegt werden:
				checkZerlegtMod = (checkZerlegtInput === true)? 3 : 0;												//Zuweisen eines Wertes für aktivierte Checkbox
		const checkZaehInput = html.find("#checkZaeh")[0].checked;													//Das Fleisch ist zäh:
				checkZaehMod = (checkZaehInput === true)? 5 : 0;													//Zuweisen eines Wertes für aktivierte Checkbox
		const checkTSBackenBratenInput = html.find("#checkTSBackenBraten")[0].checked;								//Talentspezialisierung: Backen/Braten
				checkTSBackenBratenMod = (checkTSBackenBratenInput === true)? 2 : 0;								//Zuweisen eines Wertes für aktivierte Checkbox
		const checkTSHaltbarInput = html.find("#checkTSHaltbar")[0].checked;										//Talentspezialisierung: Haltbarmachen
				checkTSHaltbarMod = (checkTSHaltbarInput === true)? 2 : 0;											//Zuweisen eines Wertes für aktivierte Checkbox
		const checkTSMarschInput = html.find("#checkTSMarsch")[0].checked;											//Talentspezialisierung: Marschrationen
				checkTSMarschMod = (checkTSMarschInput === true)? 2 : 0;											//Zuweisen eines Wertes für aktivierte Checkbox
				
		//Dropdown
		switch(KraeuterInput){
            case 0:
				KraeuterMod = 0;
				break;
			case 1:
				KraeuterMod = 3;
				break;
			case 2:
				KraeuterMod = -3;
				break;
		}

		switch(UtensilienInput){
            case 0:
				UtensilienMod = 0;
				break;
			case 1:
				UtensilienMod = 3;
				break;
			case 2:
				UtensilienMod = 7;
				break;
		}
	
		switch(MealInput){
            case 0:
				failPatzer = "Das Essen ist verbrannt und ungenießbar. Die entsprechenden Rationen sind verdorben.";
				fail = "Das Essen schmeckt widerwärtig. Nur mit einer gelungenen <i>Selbstbeherrschungs</i>-Probe ist es runterzubekommen.";
				win = "Die Mahlzeit ist lecker und sättigend.";
				break;
			case 1:
				failPatzer = "Das Essen ist verbrannt und ungenießbar. Die entsprechenden Rationen sind verdorben.";
				fail = "Das Essen ist verbrannt und ungenießbar. Die entsprechenden Rationen sind verdorben.";
				win = "Es wurden " + RationenMod + " Rationen gegart und sind für ";
				break;
			case 2:
				failPatzer = "Das Essen ist versalzen und ungenießbar. Die entsprechenden Rationen sind verdorben.";
				fail = "Das Essen ist versalzen und ungenießbar. Die entsprechenden Rationen sind verdorben.";
				win = "Es wurden " + RationenMod + " Rationen gepökelt und sind für ";
				break;
			case 3:
				Marschrationen = RationenMod + checkTSMarschMod;
				failPatzer = "Die Marschrationen sind ungenießbar. Die entsprechenden Rationen sind verdorben.";
				fail = "Die Marschrationen sind ungenießbar. Die entsprechenden Rationen sind verdorben.";
				win = "Es wurden " + Marschrationen + " Marschrationen hergestellt und sind für ";
				break;
		}
	
		//Roll the dice
        let talentRoll = new Roll("3d20").roll({async: true});
        talentRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;

	//Talent
		const TaW = KochenValue;
			
			mod = - FleischerBonusMod + checkZerlegtMod + checkZaehMod + unbekanntesFleischMod + KraeuterMod + FeuerstellehMod + UtensilienInput + Math.round(PersonenMod/5) + unbekanntesGemueseMod
			modOutput = (mod >=0)? "+" + mod: mod;
		
			if(MealInput === 0){
				eTaW = TaW + checkTSBackenBratenMod;
			}if(MealInput === 1){
				eTaW = TaW + checkTSHaltbarMod + (checkTSMarschMod/2);
			}if(MealInput === 2){
				eTaW = TaW + checkTSHaltbarMod + (checkTSMarschMod/2);
			}if(MealInput === 3){
				eTaW = TaW + checkTSMarschMod;
			}
			
			eTaWMod = eTaW - mod;
			resOne = cleverness - w1;
			resOne += (eTaWMod < 0)? eTaWMod: 0;
			resTwo = intuition - w2;
			resTwo += (eTaWMod < 0)? eTaWMod: 0;
			resThree = dexterity - w3;
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
			
			if(TalentResult < -10){
				failOut = failPatzer;
			}if(TalentResult >= 0){
				failOut = win;
			}if(TalentResult === -10){
				failOut = fail;
			}if(TalentResult === -9){
				failOut = fail;
			}if(TalentResult === -8){
				failOut = fail;
			}if(TalentResult === -7){
				failOut = fail;
			}if(TalentResult === -6){
				failOut = fail;
			}if(TalentResult === -5){
				failOut = fail;
			}if(TalentResult === -4){
				failOut = fail;
			}if(TalentResult === -3){
				failOut = fail;
			}if(TalentResult === -2){
				failOut = fail;
			}if(TalentResult === -1){
				failOut = fail;
				}
			//Haltbarkeit
			Haltbarkeit = 0.5 * TalentResult;
			
			//Chat Output
            flavor = "<b>Kochen nach WdE</b>";
			flavor += "<br><b>KL</b>: " + w1 + "/" + "<b>" + cleverness + "</b>" + " (" + resOne + ")";
			flavor += "<br><b>IN</b>: " + w2 + "/" + "<b>" + intuition + "</b>" + " (" + resTwo + ")";
			flavor += "<br><b>FF</b>: " + w3 + "/" + "<b>" + dexterity + "</b>" + " (" + resThree + ")";
			flavor += "<br>TaW / Modifikation: " + eTaW + " / " + modOutput;
			flavor += "<br>TaP*: " + TalentResult + " (" + luck + ")";
			if(MealInput === 0){
				flavor += "<br>" + failOut;
			}else{
				flavor += "<br>" + failOut + Haltbarkeit + " Tage genießbar";
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
