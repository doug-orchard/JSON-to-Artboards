// Doug's script to make artboards based on json data

if ( app.documents.length > 0 ) {

    doc = app.activeDocument;

    if(!doc.saved){
        Window.alert("This script needs to modify your document. Please save it before running this script.");
        return;
    }

}else{
    Window.alert("You must open at least one document.");
}

function jsonData(){
    return [
        {
            "name": "one"
        },
        {
            "name": "two"
        },
        {
            "name": "three"
        }
    ];
}

function rect(x, y, w, h) {
    return [x, -y, (x + w), -(y + h)];
}

function jsonToArtboards(doc){
    var _data = jsonData(), rows = 0, cols = -1, x = 0, y = 1;

    for (var i = 0; i < _data.length; i++) {

        var newRect = function(x, y, width, height) {
            var l = 0;
            var t = 1;
            var r = 2;
            var b = 3;

            var rect = [];

            rect[l] = x;
            rect[t] = -y;
            rect[r] = width + x;
            rect[b] = -(height - rect[t]);

            return rect;
        };

        cols++;

        if( cols >= 10 ){
            cols = 0;
            rows++;
        }

        y = rows * 90;
        x = cols * 90;

        var artboards = doc.artboards;
        var artboard = artboards.add(artboards[0].artboardRect);
        artboard.name = _data[i].name;
        artboard.artboardRect = newRect(x, y, 80, 80);

    }
}

jsonToArtboards(doc);
