/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ShellRenderer");sap.m.ShellRenderer={};
sap.m.ShellRenderer.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapMShell");if(c.getAppWidthLimited()){r.addClass("sapMShellAppWidthLimited")}sap.m.BackgroundHelper.addBackgroundColorStyles(r,c.getBackgroundColor(),c.getBackgroundImage());r.writeClasses();r.writeStyles();var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");sap.m.BackgroundHelper.renderBackgroundImageTag(r,c,"sapMShellBG",c.getBackgroundImage(),c.getBackgroundRepeat(),c.getBackgroundOpacity());r.write("<div class='sapMShellBrandingBar'></div>");r.write("<div class='sapMShellCentralBox'>");var e="",a="";if(!c.getBackgroundImage()){e="sapMShellBackgroundColorOnlyIfDefault";a="sapMGlobalBackgroundImageOnlyIfDefault"}r.write("<header class='sapMShellHeader "+e+"' id='"+c.getId()+"-hdr'>");r.write("<div class='"+a+"'></div>");r.write(sap.m.ShellRenderer.getLogoImageHtml(c));r.write("<h1 id='"+c.getId()+"-hdrTxt' class='sapMShellHeaderText'>");r.writeEscaped(c.getTitle());r.write("</h1>");r.write("<span class='sapMShellHeaderRight'>");r.write("<span id='"+c.getId()+"-hdrRightTxt' ");if(!c.getHeaderRightText()){r.writeAttribute("style","display:none;")}r.write("class='sapMShellHeaderRightText'>"+jQuery.sap.encodeHTML(c.getHeaderRightText())+"</span>");if(c.getShowLogout()){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m");r.write("<a id='"+c.getId()+"-logout' tabindex='0' role='button' class='sapMShellHeaderLogout'>"+b.getText("SHELL_LOGOUT")+"</a>")}r.write("</span></header>");r.write("<section class='sapMShellContent' id='"+c.getId()+"-content' data-sap-ui-root-content='true'>");r.renderControl(c.getApp());r.write("</section></div></div>")};
sap.m.ShellRenderer.getLogoImageHtml=function(c){var i=c.getLogo();if(!i){jQuery.sap.require("sap.ui.core.theming.Parameters");i=sap.ui.core.theming.Parameters.get('sapUiGlobalLogo');if(i){var m=/url[\s]*\('?"?([^\'")]*)'?"?\)/.exec(i);if(m){i=m[1]}else if(i==="''"){i=null}}}var r="";if(i){r="<div class='sapMShellLogo'>";if(sap.ui.Device.browser.internet_explorer){r+="<span class='sapMShellLogoImgAligner'></span>"}r+="<img id='"+c.getId()+"-logo' class='sapMShellLogoImg' src='";r+=jQuery.sap.encodeHTML(i);r+="' /></div>"}return r};