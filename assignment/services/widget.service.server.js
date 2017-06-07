module.exports = function (app) {

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);


    widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    function createWidget(req, res) {
        var pageId = req.body.pageId;
        var widget = req.body.widget;
        widget.pageId = pageId;
        widgets.push(widget);

    }

    function findAllWidgetsForPage(req, res) {
        var resultSet = [];
        for(var w in widgets) {
            if(widgets[w].pageId === req.params.pageId) {
                resultSet.push(widgets[w]);
            }
        }
        res.json(resultSet);
    }

    function findWidgetById(req, res) {
        for(var w in widgets) {
            if(widgets[w]._id === req.params.widgetId) {
                resultSet.json(widgets[w]);
            }
        }
    }

    function updateWidget(req, res) {
        var widget = req.body.widget;
        var widgetId = req.params.widgetId;
        for (var v in widgets) {
            if (widgets[v]._id === widgetId) {
                widgets[v] = widget;
                res.sendStatus(200);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.json(widgets);
    }
};
