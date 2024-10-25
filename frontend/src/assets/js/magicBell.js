function initializeNotifications(target, userEmail) {
    (function(i,s,o,g,r,a,m) {
      i['MagicBellObject'] = r; 
      (i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }), (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://assets.magicbell.io/magicbell.min.js', 'magicbell');
  
    var options = {
      apiKey: "a57d1dd3e5da77cb320ff262ba218aba309035be",
      userEmail: userEmail,
      height: 500,
      theme: {
        "icon": {
          "borderColor": "#ABB1B5",
          "width": "24px"
        },
        "unseenBadge": {
          "backgroundColor": "#29ABFF"
        },
        "header": {
          "backgroundColor": "#23333D",
          "textColor": "#ffffff",
          "borderRadius": "16px"
        },
        "footer": {
          "backgroundColor": "#23333D",
          "textColor": "#ffffff",
          "borderRadius": "16px"
        },
        "notification": {
          "default": {
            "textColor": "#29ABFF",
            "borderRadius": "8px",
            "backgroundColor": "#23333D"
          }
        },
        "unseen": {
          "backgroundColor": "#23333D",
          "textColor": "#29ABFF",
          "borderRadius": "8px"
        },
        "unread": {
          "backgroundColor": "#23333D",
          "textColor": "#29ABFF",
          "borderRadius": "8px"
        }
      }
    };
  
    magicbell('render', target, options);
  }
  