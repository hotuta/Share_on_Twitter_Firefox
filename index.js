var tabs = require("sdk/tabs");
var contextMenu = require("sdk/context-menu");
var selection = require("sdk/selection");
var data = require("sdk/self").data;
var buttons = require('sdk/ui/button/action');

// toolbar button

var button = buttons.ActionButton({
    id: "tweetright",
    label: "Share on Twitter",
    icon: {
      "16": "./16.png",
      "32": "./32.png",
      "64": "./64.png",
      "128": "./128.png"
    },
    onClick: function(state) {
        tabs.open({url: "https://twitter.com/intent/tweet?url="+ encodeURIComponent(tabs.activeTab.url) +"&text="+encodeURIComponent(tabs.activeTab.title), inNewWindow: false});
    }
});

// context menu items

contextMenu.Item({
  label: "Share Link on Twitter",
  context: contextMenu.SelectorContext("a[href]"),
  contentScript: 'self.on("click", function (node, data) {' +
                 '  self.postMessage({"url": node.href, "title": node.textContent});' +
                 '});',
  onMessage: function (pageData) {
  	tabs.open({url: "https://twitter.com/intent/tweet?url="+ encodeURIComponent(pageData.url) + "&text=" + encodeURIComponent(pageData.title), inNewWindow: false});
  }
});

contextMenu.Item({
  label: "Share on Twitter",
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function (node, data) {' +
                 '  self.postMessage();' +
                 '});',
  onMessage: function (pageData) {
  	tabs.open({url: "https://twitter.com/intent/tweet?url="+ encodeURIComponent(tabs.activeTab.url) + "&text=" + encodeURIComponent(tabs.activeTab.title), inNewWindow: false});
  }
});

contextMenu.Item({
  label: "Share Image on Twitter",
  context: contextMenu.SelectorContext("img"),
  contentScript: 'self.on("click", function (node, data) {' +
                 '  self.postMessage({"url": node.src});' +
                 '});',
  onMessage: function (pageData) {
  	tabs.open({url: "https://twitter.com/intent/tweet?url="+ encodeURIComponent(pageData.url) + "&text= [image]", inNewWindow: false});
  }
});

contextMenu.Item({
  label: "Share Text on Twitter",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function (node, data) {' +
  				 'var text = window.getSelection().toString();' +
                 'self.postMessage({"text": text});' +
                 '});',
  onMessage: function (pageData) {
  	tabs.open({url: "https://twitter.com/intent/tweet?url="+ encodeURIComponent(tabs.activeTab.url) + "&text= "+ encodeURIComponent(pageData.text), inNewWindow: false});
  }
});