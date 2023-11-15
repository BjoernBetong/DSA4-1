// Skript für das Brauen eines Trankes nach WdA


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
		const Alchimie = token.actor.items.find(item => item.name === "Alchimie");																													//Suche nach dem Talent "Alchimie"
		const AlchimieValue = (Alchimie === undefined)? isNaN : (Alchimie.system.value === null)? 0 : Alchimie.system.value;																		//Abrufen des TaW des Talents "Alchimie"
		const Kochen = token.actor.items.find(item => item.name === "Kochen");																														//Suche nach dem Talent "Kochen"
		const KochenValue = (Kochen === undefined)? isNaN : (Kochen.system.value === null)? 0 : Kochen.system.value;																				//Abrufen des TaW des Talents "Kochen"

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
	//Das brauen von Tränken
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br>braut einen Trank" + "</h2>";
    inputDialog = headerDialog;
	inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectSkill">Talent:</label>
                 <select name="SelectSkill" id="SelectSkill" style="float:right">
					<option value="0">Alchimie</option>
					<option value="1">Kochen mit TS Tränke</option>
					</select>
            </form>
        `+ divFlexEnd
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectPotion">bekannte Tränke:</label>
                 <select name="SelectPotion" id="SelectPotion" style="float:right">
					<option value="0">Heiltrank</option>
					<option value="1">Zauberkreide</option>
					<option value="2">Zaubertrank</option>
					<option value="99">eigenes Rezept</option>
					</select>
            </form>
        `+ divFlexEnd
		inputDialog += divFlexStart + "Brau-Schwierigkeit<input id='Difficulty'" + divInputNumber  + "0'/>" + divFlexEnd;
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="RequiredLab">benötigte Laborstufe:</label>
                 <select name="RequiredLab" id="RequiredLab" style="float:right">
					<option value="0">archaisches Labor/Analyse-Koffer</option>
					<option value="1">Hexenküche</option>
					<option value="2">Alchimistenlabor</option>
					</select>
            </form>
        `+ divFlexEnd		
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="ActualLab">verfügbare Laborstufe:</label>
                 <select name="ActualLab" id="ActualLab" style="float:right">
					<option value="0">archaisches Labor/Analyse-Koffer</option>
					<option value="1">Hexenküche</option>
					<option value="2">Alchimistenlabor</option>
					</select>
            </form>
        `+ divFlexEnd
		inputDialog += divFlexStart + "Meisterhandwerk: <i>Alchimie</i> oder <i>Kochen</i><input id='Mhw'" + divInputNumber  + "0'/>" + divFlexEnd + hr;	
		inputDialog += "Qualität des Gebräus verbessern";
		inputDialog += divFlexStart + "TaW zurückhalten<input id='TaWboost'" + divInputNumber  + "0'/>" + divFlexEnd;
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="astralboost">Trank astral aufladen:</label>
                 <select name="astralboost" id="astralboost" style="float:right">
					<option value="0">keine Aufladung</option>
					<option value="1">Qualität: +1 / 1 AsP</option>
					<option value="2">Qualität: +2 / 2 AsP</option>
					<option value="3">Qualität: +3 / 4 AsP</option>
					<option value="4">Qualität: +4 / 8 AsP</option>
					<option value="5">Qualität: +5 / 16 AsP</option>
					<option value="6">Qualität: +6 / 32 AsP</option>
					<option value="7">Qualität: +7 / 64 AsP</option>
					<option value="8">Qualität: +8 / 128 AsP</option>
					</select>
            </form>
        `+ divFlexEnd + hr;
		inputDialog += "Analyse des Gebräus";
		inputDialog += divFlexStart + "Analyse-Schwierigkeit<input id='Analytic'" + divInputNumber  + "0'/>" + divFlexEnd;		
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
		const PotionInput = Number(html.find("#SelectPotion")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const RequiredLabInput = Number(html.find("#RequiredLab")[0]?.value || 0);		//Auswahl eines Wertes für das Dropdown-Menü
		const ActualLabInput = Number(html.find("#ActualLab")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const astralboostInput = Number(html.find("#astralboost")[0]?.value || 0);		//Auswahl eines Wertes für das Dropdown-Menü

		const DifficultyInput = Number(html.find("#Difficulty")[0]?.value || 0);		//Brau-Schwierigkeit
		const AnalyticInput = Number(html.find("#Analytic")[0]?.value || 0);			//Analyse-Schwierigkeit
		const MhwInput = Number(html.find("#Mhw")[0]?.value || 0);						//Meisterhandwerk: Alchimie oder Kochen
		const TaWboostInput = Number(html.find("#TaWboost")[0]?.value || 0);			//TaW zurückhalten um die Qualität zu verbessern
		
		//Checkboxes

		//Dropdown-Menü
		
		switch(RequiredLabInput){
			case 0://archaisches Labor/Analyse-Koffer
				ReqLabInput = 0;
				break;
			case 1://Hexenküche
				ReqLabInput = 1;
				break;
			case 2://Alchimistenlabor
				ReqLabInput = 2;
				break;
		}

		switch(ActualLabInput){
			case 0://archaisches Labor/Analyse-Koffer
				actLabInput = 0;
				break;
			case 1://Hexenküche
				actLabInput = 1;
				break;
			case 2://Alchimistenlabor
				if(TalentInput === 0){
					actLabInput = 2;
				}else{
					actLabInput = 1;	//mit dem Talent "Kochen" hat das Alchimistenlabor nur den Wert einer Hexenküche
				}
				break;
		}

		switch(astralboostInput){
			case 0:
				astralCost = 0;
				astralBoost = 0;
				break;
			case 1:
				astralCost = 1;
				astralBoost = 1;
				break;
			case 2:
				astralCost = 2;
				astralBoost = 2;
				break;
			case 3:
				astralCost = 4;
				astralBoost = 3;
				break;
			case 4:
				astralCost = 8;
				astralBoost = 4;
				break;
			case 5:
				astralCost = 16;
				astralBoost = 5;
				break;
			case 6:
				astralCost = 32;
				astralBoost = 6;
				break;
			case 7:
				astralCost = 64;
				astralBoost = 7;
				break;
			case 8:
				astralCost = 128;
				astralBoost = 8;
				break;
		}

		
		switch(PotionInput){
			case 0://Heiltrank
				Potionname = "Heiltrank";
				DifficultyMod = 2;
				AnalyticMod = 1;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "14 D";
				break;
			case 1://Zauberkreide
				Potionname = "Zauberkreide";
				DifficultyMod = 2;
				AnalyticMod = 1;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "5 D";
				break;
			case 2://Zaubertrank
				Potionname = "Zaubertrank";
				DifficultyMod = 8;
				AnalyticMod = 4;
				ReqLabMod = 1;
				actLabMod = actLabInput;
				IngredientCosts = "30 D";
				break;
			case 99://eigenes Rezept
				Potionname = "Trank";
				DifficultyMod = DifficultyInput;
				AnalyticMod = AnalyticInput;
				ReqLabMod = ReqLabInput;
				actLabMod = actLabInput;
				IngredientCosts = "";
				break;
		}		
				
		switch(TalentInput){
			case 0:
				TalentName = "Alchimie";
				TalentValue = AlchimieValue;
				Att1 = courage;
				Att2 = cleverness;
				Att3 = intuition;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "KL";
				Eigenschaft3 = "IN";
				Time = 1;
				break;
			case 1:
				TalentName = "Kochen";
				TalentValue = KochenValue;
				Att1 = cleverness;
				Att2 = intuition;
				Att3 = dexterity;
				Eigenschaft1 = "KL";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "FF";
				Time = 1;
				break;
		}			

		if((ReqLabMod - actLabMod) === (ReqLabMod - 2)){
			LabMod = -3;
		}if((ReqLabMod - actLabMod) === (ReqLabMod - 1)){
			LabMod = 0;
		}if((ReqLabMod - actLabMod) === ReqLabMod){
			LabMod = 0;
		}if((ReqLabMod - actLabMod) === (ReqLabMod + 1)){
			LabMod = 7;
		}if((ReqLabMod - actLabMod) === (ReqLabMod + 2)){
			LabMod = isNaN;
		}
	
		//Roll the dice
        let talentRoll = new Roll("8d20").roll({async: true});
        talentRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;
			let w4 = roll.terms[0].results[3].result;
			let w5 = roll.terms[0].results[4].result;
			let w6 = roll.terms[0].results[5].result;
			let w7 = roll.terms[0].results[6].result;
			let w8 = roll.terms[0].results[7].result;

		TaW = TalentValue;
		
			mod = DifficultyMod + LabMod + TaWboostInput
			modOutput = (mod >=0)? "+" + mod: mod;
		
			eTaW = TaW;
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

			resFour = Math.round(w4 * 6 / 20);
			resFive = Math.round(w5 * 6 / 20);
			QualityNr = resFour + resFive + TalentResult + (2 * TaWboostInput) + astralBoost;
				if(QualityNr < 0){
					QualityLvl = "M";
				}else{
					if(QualityNr == 0 || QualityNr == 1 || QualityNr == 2 || QualityNr == 3 || QualityNr == 4 || QualityNr == 5 || QualityNr == 6){
					QualityLvl = "A";
					}else{
						if(QualityNr == 7 || QualityNr == 8 || QualityNr == 9 || QualityNr == 10 || QualityNr == 11 || QualityNr == 12){
						QualityLvl = "B";
						}else{
							if(QualityNr == 13 || QualityNr == 14 || QualityNr == 15 || QualityNr == 16 || QualityNr == 17 || QualityNr == 18){
							QualityLvl = "C";
							}else{
								if(QualityNr == 19 || QualityNr == 20 || QualityNr == 21 || QualityNr == 22 || QualityNr == 23 || QualityNr == 24){
								QualityLvl = "D";
								}else{
									if(QualityNr == 25 || QualityNr == 26 || QualityNr == 27 || QualityNr == 28 || QualityNr == 29 || QualityNr == 30){
									QualityLvl = "E";
									}else{
										QualityLvl = "F";
		}}}}}}



		AnalyticTaW = TalentValue;
		
			Analyticmod = AnalyticMod
			AnalyticmodOutput = (mod >=0)? "+" + Analyticmod: Analyticmod;
		
			eAnalyticTaW = AnalyticTaW;
			eAnalyticTaWMod = eAnalyticTaW - Analyticmod;
			resSix = Att1 - w6;
			resSix += (eAnalyticTaWMod < 0)? eAnalyticTaWMod: 0;
			resSeven = Att2 - w7;
			resSeven += (eAnalyticTaWMod < 0)? eAnalyticTaWMod: 0;
			resEight = Att3 - w8;
			resEight += (eAnalyticTaWMod < 0)? eAnalyticTaWMod: 0;
			AnalyticResult = (eAnalyticTaWMod > 0)? eAnalyticTaWMod : 0;
			AnalyticResult += (resSix < 0)? resSix : 0;
			AnalyticResult += (resSeven < 0)? resSeven : 0;
			AnalyticResult += (resEight < 0)? resEight : 0;
			AnalyticResult = (AnalyticResult == 0)? 1 : AnalyticResult;
			AnalyticResult = Math.min(AnalyticResult,eAnalyticTaW);

            luck = (AnalyticResult >= 0)? "Erfolg":"Misserfolg";
            wSum5 = w6 + w7
            wSum6 = w6 + w8
            wSum7 = w7 + w8
            wSum8 = w6 + w7 + w8
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


			fail = "<b>" + tokenName + "</b> braut einen " + Potionname + " der Stufe <b>M</b>";
			win = "<b>" + tokenName + "</b> braut einen " + Potionname + " der Stufe <b>" + QualityLvl + "</b>";
			
			if(TalentResult < 0){
				failOut = fail;
			}else{
				failOut = win;
			}
			
			Analyticfail = ", kann aber die Stufe nicht analysieren";
			Analyticwin = " und kann die Qualität des Tranks analysieren";
			
			if(AnalyticResult < 0){
				failOut2 = Analyticfail;
			}else{
				failOut2 = Analyticwin;
			}

			//Chat Output
			flavor = "<i>" + TalentName + ":</i>"; 
			flavor += "<br>" + Eigenschaft1 + ": " + w1 + "/" + "<b>" + Att1 + "</b>" + " (" + resOne + ")";
			flavor += "<br>" + Eigenschaft2 + ": " + w2 + "/" + "<b>" + Att2 + "</b>" + " (" + resTwo + ")";
			flavor += "<br>" + Eigenschaft3 + ": " + w3 + "/" + "<b>" + Att3 + "</b>" + " (" + resThree + ")";
			flavor += "<br>TaW/Modifikation: " + eTaW + "/" + modOutput;
			flavor += "<br>TaP*: " + TalentResult;
			flavor += "<br>Kosten: " + IngredientCosts + hr;
			flavor += failOut + failOut2;

            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode: CONST.DICE_ROLL_MODES.BLIND}
            );
        });
	}
}		   