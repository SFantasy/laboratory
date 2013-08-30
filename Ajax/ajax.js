var Ajax = {
    /**
     * ajax 封装
     * @param  options {
     *             type: GET || POST
     *             datatype: JSON as default
     *             url: Interface URL
     *             sdata:
     *             callback: Callback function
     *             async: true || false 
     *         }
     */
    ajax: function(options) {
        /* 参数列表 */
        var         type = options.type         || 'GET',
                datatype = options.datatype     || '',
                     url = options.url          || '',
                   sdata = options.sdata        || null,
           beforeRequest = options.beforRequest || function() {},
                callback = options.callback     || function() {},
                   fdata = options.fdata        || null,
                   async = options.async        || true;
 
        var W = Ajax.createXMLHttpRequest();
 
        W.onreadystatechange = function() {
            if(async) {
                Ajax.callbackFunction(datatype, W, callback, fdata, Ajax);
            }
        };
        /* 初始化HTTP请求参数 */
        W.open(type, url, async);
 
        if(type === 'GET') {
            W.send(null);
        } else {
            //W.setRequestHeader('Content-length', sdata.length);
            W.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            W.send(sdata);
        }
 
        if(async) {
            return W;
        } else {
            Ajax.callbackFunction(datatype, W, callback, fdata, Ajax);
        }
    },
    /* 创建兼容的 XMLHttpRequest 对象 
     *
     */
    createXMLHttpRequest: function() {
        var temp;
 
        /* 兼容IE */
        try {
            temp = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(E) {
            try {
                temp = new ActiveXObject('Microsoft.XMLHTTP');
            } catch(E) {
                temp = new XMLHttpRequest();
            }
        }
 
        return temp;
    },
    /* 回调函数 */
    callbackFunction: function(type, req, callback, data, obj) {
        /* 请求完成，响应就绪 */
        if(req.readyState == 4 && req.status == 200) {
            var result = req.getResponseHeader('content-type'),
                ajaxData = !type && result && result.indexOf('xml') >= 0;
 
            ajaxData = type == 'xml' || ajaxData ? req.responseXML : req.responseData;
 
            if(type == 'JSON') {
                ajaxData = eval("(" + req.responseText +")");
            }
 
            if(req.status != 200) {
                
            } else {
                callback(ajaxData, data);
            }
        }
    }
};
 
/* 全局对象 */
window.Ajax = Ajax;