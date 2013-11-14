# Filename:
#   Data.coffee
#  
# Author:
#   fantasyshao (http://fantasyshao.com)
# 
# License:
#   The MIT License
#

class Data
    setLocalStorage: (key, value) ->
        localStorage.key = JSON.stringfy(value)
        true

    getLocalStorage: (key) ->
        JSON.parse(localStorage.key) or null

    delLocalStorage: (key) ->
        if localStorage.removeItem key
            true
        else
            false

    setCookie: (key, value, expires, domain, path) ->
        document.cookie = "#{encodeURIComponent key}=#{encodeURIComponent value}#{if expires then '; expires=' + expires.toUTCString else ''}#{if domain then '; domain=' + domain else ''}#{if path then '; path=' + path else ''}"
        true
    
    getCookie: (key) ->
        `decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"))` or null

    updateCookie: (options) ->
        key = options.key
        value = options.value
        expires = options.expires
        domain = options.domain
        path = options.path
        divider = options.divider
        limit = options.limit

        currentCookie = @getCookie key

        if currentCookie
            cookieArray = currentCookie.split divider

            if cookieArray.indexOf value isnt -1
                cookieArray.splice (cookieArray.indexOf value), 1

            cookieArray.push value

            if limit and cookieArray.length > limit
                cookieArray.splice 0, 1

            cookieArray.join divider

            this.setCookie key, value, expires, domain, path

            true
        else
            false

