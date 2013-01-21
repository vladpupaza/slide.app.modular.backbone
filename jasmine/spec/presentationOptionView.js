describe ('Presentation option view test',function() {
	
		var p=new PresentationOptionView();
	
	it ('expects PresentationOptionView to have an id',function() {
		expect(p.id).toEqual('presentationOption');
	})

	it ('expects PresentationOptionView to read presentations names from localstorage',function() {
		localStorage.clear();
		var firstPresentation = ["arr","arr2","arr3"];
		localStorage.setItem('presentations',JSON.stringify(firstPresentation));
        expect(p.loadNamesFromLocalStorage()).toEqual(firstPresentation);
	})

	it ('expects to fill dropDown with names',function() {
		var names =["name1","name2"];
		expect(p.fillDropDown(names,2)).toEqual('<li class="options" value=name1>name1</li><li class="options" value=name2>name2</li>')
	})
});