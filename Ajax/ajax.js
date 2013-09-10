var Ajax = {
    /**
     * ajax 封装
     * @param  options {
     *             type: GET || POST
     *             datatype: JSON as default
     *             url: Interface URL
     *             data: POST your data
     *             callback: Callback function
     *             async: true || false 
     *             credentials: allow 'Access-Control-Allow-Origin' or not || false
     *         }
     */
    ajax: function(options) {
        /* 参数列表 */
        var         type = options.type         || 'GET',
                datatype = options.datatype     || 'JSON',
                     url = options.url          || '',
                    data = options.data        || null,
           beforeRequest = options.beforRequest || function() {},
                callback = options.callback     || function() {},
                   fdata = options.fdata        || null,
                   async = options.async        || true;
             credentials = options.credentials  || false;
 
        var W = Ajax.createXMLHttpRequest();
 
        W.onreadystatechange = function() {
            if(async) {
                Ajax.callbackFunction(datatype, W, callback, fdata, Ajax);
            }
        };
        /* 初始化HTTP请求参数 */
        W.open(type, url, async);

        // 根据选项，是否允许跨域
        // (不能放在上面，会有浏览器兼容问题)
        W.withCredentials = credentials;

        if(type === 'GET') {
            W.send(null);
        } else {
            W.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            W.send(data);
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