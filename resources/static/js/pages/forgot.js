/*globals BrowserID: true, $:true */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla BrowserID.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

BrowserID.forgot = (function() {
  "use strict";

  var bid = BrowserID,
      user = bid.User,
      pageHelpers = bid.PageHelpers,
      tooltip = bid.Tooltip;

  function submit(event) {
    if (event) event.preventDefault();

    // GET RID OF THIS HIDE CRAP AND USE CSS!
    $(".notifications .notification").hide();

    var email = $("#email").val(),
        valid = bid.Validation.email(email);

    if (valid) {
      user.requestPasswordReset(email, function onSuccess(info) {
        if (info.success) {
          pageHelpers.clearStoredEmail();
          $('#sent_to_email').html(email);
          $('#forminputs').fadeOut();
          $(".notifications .notification.emailsent").fadeIn();
        }
        else {
          var tooltipEl = info.reason === "throttle" ? "#could_not_add" : "#not_registered";
          tooltip.showTooltip(tooltipEl);
        }
      }, function onFailure() {
        $(".notifications .notification.doh").fadeIn();
      });
    }
  };

  function init() {
    $("form input[autofocus]").focus();

    pageHelpers.setupEmail();

    $("#signUpForm").bind("submit", submit);
  }

  function reset() {
    $("#signUpForm").unbind("submit", submit);
  }


  var forgot = init;
  forgot.submit = submit; 
  forgot.reset = reset;

  return forgot;

}());

