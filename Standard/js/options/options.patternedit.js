function patternLoad(pattern, edit){
		$(".modeAdd").show();
		$(".modeQuickAdd").hide();
		$("#patternEnabled").setChecked(pattern.data.enabled);
		$("#patternTemporary").setChecked(pattern.data.temp);
		$("#patternName").val(pattern.data.name);
		$("#patternUrl").val(pattern.data.url);
		$("input[name='patternWhitelist'][value='"+pattern.data.whitelist+"']").setChecked(true);
		$("input[name='patternType'][value='"+pattern.data.type+"']").setChecked(true);
		
		
		
			$("#patternEditDlg").dialog({
				title: localize("FoxyProxy - Add/Edit pattern"),
				modal: true,
				width:500,
				resizable: false,
				buttons: [{ 
					text:localize("Save"),
					click: function(){
						if($("#patternUrl").val() == ''){
							alert(localize("Pattern URL must be specified"));
						} else {
							var patterns = list[selectedProxy].data.patterns;
							patterns[selectedPattern].data.enabled = $("#patternEnabled").is(":checked");
							patterns[selectedPattern].data.temp = $("#patternTemporary").is(":checked");
							patterns[selectedPattern].data.name = $("#patternName").val();
							patterns[selectedPattern].data.url = $("#patternUrl").val();
							patterns[selectedPattern].data.whitelist = $("input[name='patternWhitelist']:checked").val();
							patterns[selectedPattern].data.type = $("input[name='patternType']:checked").val();
							if(!edit && patternDuplicates(patterns, pattern))
							{
								patterns.splice(selectedPattern,1);
								alert(localize("Some or all of the patterns weren't added because they duplicate existing patterns for the specified proxy."));
							}
							updatePatternTable();
							oPatternTable.fnSelectRow(selectedPattern);
							$( this ).dialog( "close" );
						}
					}
				},{
					text: localize("Cancel"),
					click: function(){
						if(!edit)list[selectedProxy].data.patterns.splice(selectedPattern, 1);
						updatePatternTable(selectedPattern)
						$( this ).dialog( "close" );
					}
				}]
			});
	}

function patternDuplicates(patternsList, pattern)
{	
	duplicate = false
	$.each(patternsList, function (a, b)
		{
			if(b == pattern)return;
			if(b.data.url == pattern.data.url)duplicate = true;
		}
	);
	return duplicate;
}