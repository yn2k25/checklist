
// Generated from your manual (doc/pdf/html). Single-page workflow renderer.

const STEPS = [{"id": "step1", "num": 1, "title": "Step 1: What type of interaction is this?", "section": "Start", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Start</i></p>
<p class=\"MsoNormal\">Choose one to begin.</p>", "buttons": [{"kind": "help", "label": "Scheduled appointment"}, {"kind": "help", "label": "Walk in"}], "helps": []}, {"id": "step2", "num": 2, "title": "Step 2: Appointment prep", "section": "Before meet and greet", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Before meet and greet</i></p>
<p class=\"MsoNormal\">Checklist:</p>
<p class=\"MsoListBulletCxSpFirst\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span><span style='font-family:\"Cambria Math\",serif'>Scheduled: Check
PP for Consultation Form</span></p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Find the person in PP</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Memos/Files</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Scroll to Memos section</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Find “Consultation Form” </p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Review Consultation Form (CF)</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Check PP for Do Not Adopt (DNA)</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>If there is an alert for DNA, one should
pop-up when you open the Person record.</p>
<p class=\"MsoListBulletCxSpLast\" style=\"margin-left:.5in\"><span style=\"font-family:
Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Also check memos for a DNA note.</p>
<p class=\"MsoNormal\">Confirm when these are done.</p>", "buttons": [{"kind": "next", "label": "Yes - all done"}, {"kind": "help", "label": "Where is the CF in PP?"}, {"kind": "help", "label": "Where to check Do Not Adopt (DNA)?"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Where is the form in PP?", "img": "1-CF-in-PP.png", "desc": "How to check CF in PP", "bullets": []}, {"title": "Where is DNA in PP?", "img": "2-DNA-in-PP.png", "desc": "How to check DNA status", "bullets": []}]}, {"id": "step3", "num": 3, "title": "Step 3: Walk in prep", "section": "Before meet and greet", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Before meet and greet</i></p>
<p class=\"MsoNormal\">Complete these first.</p>
<p class=\"MsoNormal\">Checklist:</p>
<p class=\"MsoListBulletCxSpFirst\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span><span style='font-family:\"Cambria Math\",serif'>Walk-in: </span>Have
the visitor complete <span style='font-family:\"Cambria Math\",serif'>the
Consultation Form</span></p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Make sure all required questions are answered.</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>PetPoint checked for Do Not Adopt (DNA)</p>
<p class=\"MsoListBulletCxSpLast\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span><span style=\"background:yellow\">If person does not exist in PP,  you
can create the record after meet &amp; greet.</span></p>", "buttons": [{"kind": "next", "label": "Yes - both done"}, {"kind": "help", "label": "Where is DNA in PP?"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Where is DNA in PP?", "img": "2-DNA-in-PP.png", "desc": "How to check DNA status", "bullets": []}]}, {"id": "step4", "num": 4, "title": "Step 4: Any concerning behavior?", "section": "Meet and greet", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Meet and greet</i></p>
<p class=\"MsoNormal\">Watch how the adopter interacts with the cat. If anything
feels off, pause and talk to staff.</p>", "buttons": [{"kind": "branch_no", "label": "No - everything looks appropriate"}, {"kind": "next", "label": "Yes - concern exists"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step5", "num": 5, "title": "Step 5: Did they choose a cat today?", "section": "Decision", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Decision</i></p>
<p class=\"MsoNormal\">If they clearly chose a specific cat today, pick Yes and
move into the adoption steps.</p>
<p class=\"MsoNormal\">If they are still thinking, or no cat is going home today,
pick No.</p>", "buttons": [{"kind": "next", "label": "Yes - proceeding with adoption"}, {"kind": "branch_no", "label": "No - no adoption today"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step6", "num": 6, "title": "Step 6: Does the adopter already have a Person record?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoNormal\">From the main search, type their name and confirm if there
is already a record for this person.</p>
<p class=\"MsoNormal\">If the Person does NOT exist in PP:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Create the Person record:</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Use the green plus icon to create a new
Person.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Fill in name, address, phone, and email so
you can contact them later.</p>", "buttons": [{"kind": "next", "label": "Yes - Person already exists"}, {"kind": "help", "label": "How to create a Person record"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "How to create a Person record", "img": "3-New-Person-in-PP.png", "desc": "How to create a new Person record", "bullets": []}]}, {"id": "step7", "num": 7, "title": "Step 7: If the adopter is in PP, is contact info verified?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoNormal\">To edit : click the green pencil icon under the person’s
name next to “Details”<br/>
<br/>
Buttons on this screen:</p>
<p class=\"MsoListBulletCxSpFirst\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Yes – continue [primary (green)]</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>How to edit the contact info [outline utility]</p>
<p class=\"MsoListBulletCxSpLast\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Back [outline utility]</p>
<p class=\"MsoNormal\">Help overlay text (How to edit the contact info):<br/>
<b><span style=\"color:black\">Show </span><span style=\"color:#8064A2\">4-Edit-Contact.png</span></b><br/>
<i>Description: </i>How to edit contact info<br/>
<br/>
</p>", "buttons": [], "helps": []}, {"id": "step8", "num": 8, "title": "Step 8: Has Outcome to Adoption been started?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoNormal\">The <b>Person</b> record should show an active Adoption
outcome.</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Open the Person record for the adopter.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Use the green plus menu to add a new
Outcome.<br/>
<br/>
</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Type:</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Adoption</b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Kittyville</span></b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Date </p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Today’s
  date</b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Status</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Completed</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Asilomar
  Status</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Healthy
  (Unless stated otherwise on cat)</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Jurisdiction</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Change to Person’s jurisdiction</span></b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Person</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Verify this matches</span></b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Animals</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Search and find the kitty</span></b></p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Type:</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Adoption</b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Kittyville</span></b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Date </p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Today’s
  date</b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Status</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Completed</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Asilomar
  Status</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Healthy
  (Unless stated otherwise on cat)</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Jurisdiction</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Change to Person’s jurisdiction</span></b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Person</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Verify this matches</span></b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Animals</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Search and find the kitty</span></b></p>
<p class=\"MsoListParagraph\"> </p>
<p class=\"MsoNormal\"><b><u><span style='font-family:\"Apple Color Emoji\"'>🐈🐈</span>
For multiple cats, you need to repeat the search and find second kitty.</u></b></p>
<p class=\"MsoListParagraph\" style=\"text-indent:-.25in\"><span style=\"font-family:
Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click on the blue name for each cat, which
will open the cat’s record in a new tab.</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "How to start Adoption Outcome"}, {"kind": "help", "label": "How to fill Outcome form"}, {"kind": "help", "label": "🐈🐈"}, {"kind": "help", "label": "How to fill Outcome for Multi-cat"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "How to start Adoption Outcome", "img": "5-create-new-outcome-on-person.png", "desc": "How to start Adoption Outcome", "bullets": []}, {"title": "How to fill Outcome form", "img": "6-outcome-form-filled.png", "desc": "How to fill Outcome form", "bullets": []}, {"title": "Help overlay text (", "img": "7-multiple-cat-outcome-on-person.png", "desc": "How to fill Outcome for Multi-cat", "bullets": ["🐈🐈", "How to fill Outcome for Multi-cat"]}]}, {"id": "step9", "num": 9, "title": "Step 9: Have vouchers been created for each cat?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoNormal\"><b><u>Each</u></b> cat should have the correct voucher
created.</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Go to the Cat record</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Vouchers/Waivers tab</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click green + icon</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Type:</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Care</b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>EDAH 30-day Exam Voucher</span></b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Issued </p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Today’s
  date</b></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Expiry</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">[
  automatically calculated]</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Issued by</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Fearless Kitty, Rescue</span></b></p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Type:</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Care</b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>EDAH 30-day Exam Voucher</span></b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Issued </p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>Today’s
  date</b></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Expiry</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">[
  automatically calculated]</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Issued by</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b><span style='font-size:10.5pt;font-family:\"Segoe UI\",sans-serif;color:#212529;
  background:white'>Fearless Kitty, Rescue</span></b></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Save.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>After saving vouchers on each cat, return to
Person tab</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Save on the Outcome form.</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "Where to create voucher?"}, {"kind": "help", "label": "How to fill Voucher form?"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Where to create voucher?", "img": "8-Create-Voucher.png", "desc": "Where to create voucher", "bullets": []}, {"title": "How to fill Voucher form?", "img": "9-voucher-on-cat.png", "desc": "Cat voucher example", "bullets": []}]}, {"id": "step10", "num": 10, "title": "Step 10: Is microchip consent and Petco choice completed?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Inform adopter of the microchip</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Make sure the adopter understands – “Yes” is
required.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Petco Vital Care Core Program is optional.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click \"Save\" at the bottom of the
page. This completes and creates the Outcome.</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step11", "num": 11, "title": "Step 11: Have folder contents been reviewed and ADA signed?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoListParagraph\" style=\"text-indent:-.25in\"><span style=\"font-family:
Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Review contents of red folder:</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"width:6.15in;margin-left:.5in;border-collapse:collapse;border:none\" width=\"590\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Adoption
  Disclosure(s):</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Review Kitten
  and/or any Medical ADA's with adopter and have them sign and date. If not a
  kitten, pull ADA and refile it. Ask adopter if they want a copy of ADA(s).</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Spay/Neuter
  date</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">If more than
  2 weeks since surgery, pull the spay/neuter info and</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">return to
  hanging file.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Vaccination
  status</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">If 2nd
  vaccine due in future, give adopter the FKR Medical</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">business
  card; ask them to send email to address on card</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">to request
  appointment date noted on form.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Advice
  Document</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Point out any
  pertinent areas based on situation</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">o Introducing
  new kitty to other cats, dogs, children,</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">o List of
  items to purchase if not already owned.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Boutique
  Discount</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">$5 off a
  minimum $10 total- valid for 30 days</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Petco
  document</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">20% off
  ENTIRE purchase. Note Expiration Date</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Continuing
  Care:</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">This is for
  any other non-FKR kitties that the adopter has. Pull from folder if adopter
  has no non-FKR kitties.</p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Adoption
  Disclosure(s):</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Review Kitten
  and/or any Medical ADA's with adopter and have them sign and date. If not a
  kitten, pull ADA and refile it. Ask adopter if they want a copy of ADA(s).</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Spay/Neuter
  date</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">If more than
  2 weeks since surgery, pull the spay/neuter info and</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">return to
  hanging file.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Vaccination
  status</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">If 2nd
  vaccine due in future, give adopter the FKR Medical</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">business
  card; ask them to send email to address on card</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">to request
  appointment date noted on form.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Advice
  Document</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Point out any
  pertinent areas based on situation</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">o Introducing
  new kitty to other cats, dogs, children,</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">o List of
  items to purchase if not already owned.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Boutique
  Discount</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">$5 off a
  minimum $10 total- valid for 30 days</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Petco
  document</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">20% off
  ENTIRE purchase. Note Expiration Date</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Continuing
  Care:</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">This is for
  any other non-FKR kitties that the adopter has. Pull from folder if adopter
  has no non-FKR kitties.</p>
<p class=\"MsoNormal\"> </p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Add copy of ADA to folder, if requested.
Keep originals. </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Add kennel card to folder</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Give folder and contents to adopter</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step12", "num": 12, "title": "Step 12: Has the contract been signed and emailed?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\">1.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Have the adopter read the laminated contract. Find out if there
are any questions before proceeding.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">2.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Go to the Person page. </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">3.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>On the Records tab, scroll to the Outcome record created <b><u>today</u></b>.
(Previous FKR adopters may have a previous outcomes)</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">4.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>On the right side, click the green Printer icon</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">5.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Select <b><u>Contract</u></b>  OR if  <span style='font-family:
\"Apple Color Emoji\"'>🐈🐈</span> select <b><u>Multi-Animal
Contract</u></b> </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">6.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Verify correct animal(s) listed on Contract page</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">7.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Scroll to the bottom of the page and click the green eSignature
box.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">8.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Have adopter sign via the signature pad. Click Next.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">9.<span style='font:7.0pt \"Times New Roman\"'>     </span><span dir=\"LTR\"></span>Adoption counselor (you!) sign for the Organization. Click
Finish. </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">10.<span style='font:7.0pt \"Times New Roman\"'>  </span><span dir=\"LTR\"></span>Scroll
down on the new page displaying the contract. CIick \"Email\" button.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\">11.<span style='font:7.0pt \"Times New Roman\"'>  </span><span dir=\"LTR\"></span>Review
what's being sent to the adopter with the adopter:<br/>
• Medical History Report</p>
<p class=\"MsoListParagraphCxSpMiddle\">• Your Adoption Contract</p>
<p class=\"MsoListParagraphCxSpMiddle\">• 24 PetWatch Microchip Registration
Information</p>
<p class=\"MsoListParagraphCxSpMiddle\">• Voucher</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\">12.<span style='font:7.0pt \"Times New Roman\"'>  </span><span dir=\"LTR\"></span>Click
send, ensure confirmation \"E-mail Sent\" is there before closing the
page.</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "Where to create contract?"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Where to create contract?", "img": "10-create-contract-on-person-outcome.png", "desc": "Adoption Contract creation example", "bullets": []}]}, {"id": "step13", "num": 13, "title": "Step 13: Is the payment slip (paper) completed and payment processed?", "section": "Adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Adoption</i></p>
<p class=\"MsoNormal\">Payment should be collected and recorded correctly:</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Date, Kitty
  Name and Adopter Name</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">As
  appropriate</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><span style=\"color:#0C080D\">Adoption Fee</span></p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal;text-autospace:
  none\"><span style=\"color:#0C080D\">Enter amount of adoption fee and note any
  variants to fee (Waived / reduced / name your fee event)</span></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Boutique
  Purchase</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Itemize items
  purchased on back of slip, mark discounts if applicable. List total on front
  of slip. OR:<br/>
  Have adopter take all boutique purchases to front desk.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Donations</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">As
  appropriate</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Payment</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>X</b> line
  for payment type if cash or check</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Cash or check: staple to back of payment
  slip</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Debit/Credit card: type of card &amp; last
  4 numbers of card as detected in Square confirmation. (Note Apple pay numbers
  may not match physical card #, so use the number recorded by Square).</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"> </p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Date, Kitty
  Name and Adopter Name</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">As
  appropriate</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><span style=\"color:#0C080D\">Adoption Fee</span></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal;text-autospace:
  none\"><span style=\"color:#0C080D\">Enter amount of adoption fee and note any
  variants to fee (Waived / reduced / name your fee event)</span></p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Boutique
  Purchase</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Itemize items
  purchased on back of slip, mark discounts if applicable. List total on front
  of slip. OR:<br/>
  Have adopter take all boutique purchases to front desk.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Donations</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">As
  appropriate</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Payment</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"><b>X</b> line
  for payment type if cash or check</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Cash or check: staple to back of payment
  slip</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Debit/Credit card: type of card &amp; last
  4 numbers of card as detected in Square confirmation. (Note Apple pay numbers
  may not match physical card #, so use the number recorded by Square).</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\"> </p>
<p class=\"MsoListParagraph\" style=\"text-indent:-.25in\"><span style=\"font-family:
Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span> </p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step14", "num": 14, "title": "Step 14: Final checks before leaving", "section": "Sending kitty home", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Sending kitty home</i></p>
<p class=\"MsoNormal\">Checklist:</p>
<p class=\"MsoListBulletCxSpFirst\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Microchip verified before carrier</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Kitten weight recorded</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Take photo of kitty with family, if signed release</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Age appropriate adoption bag given with:</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span> dry food</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>2 cans wet food</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>bag of treats</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>blanket</p>
<p class=\"MsoListBulletCxSpMiddle\" style=\"margin-left:.5in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>2 toys. </p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Litter sample if available</p>
<p class=\"MsoListBulletCxSpLast\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Red folder</p>", "buttons": [{"kind": "help", "label": "Adopter has left"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step15", "num": 15, "title": "Step 15: Has the adopter memo been completed?", "section": "After adopter leaves", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves</i></p>
<p class=\"MsoNormal\">Add an Adoption Outcome memo on the person record:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>On the Person record, go to Memos/Files Tab</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click the green + next to Memos.</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin:0in;line-height:normal\">Type</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Outcome</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adopted</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Review
  date</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Comments</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin:0in;line-height:normal\">This
  should include key facts about the adopter and appointment and items you
  discussed you feel would be helpful if adopter calls with questions. </p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">•
  None of this information is being published and will remain private in
  PetPoint.</p>
</td>
</tr>
</table>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin:0in;line-height:normal\">Type</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Outcome</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adopted</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Review
  date</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Comments</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin:0in;line-height:normal\">This
  should include key facts about the adopter and appointment and items you
  discussed you feel would be helpful if adopter calls with questions. </p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">•
  None of this information is being published and will remain private in
  PetPoint.</p>
<p class=\"MsoListParagraph\"> </p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "How to add Adoption Outcome Memo?"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "How to add Adoption Outcome Memo?", "img": "11-Adopter-memo.png", "desc": "Adoption Outcome Memo example", "bullets": []}]}, {"id": "step16", "num": 16, "title": "Step 16: Has the cat outcome memo been completed?", "section": "After adopter leaves", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves</i></p>
<p class=\"MsoNormal\">Add a short outcome memo on Each Cat record.</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Memos/Files.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click the green + sign next to Memos.</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin:0in;line-height:normal\">Type</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Outcome</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adopt</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Review
  date</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraph\" style=\"margin:0in;line-height:normal\">Comments</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">You can add a
  simple sentence saying kitty was adopted and if they will join other pets in
  their new home. No other personal information about adopter.</p>
</td>
</tr>
</table>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin:0in;line-height:normal\">Type</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Outcome</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adopt</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Review
  date</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
<p class=\"MsoListParagraph\" style=\"margin:0in;line-height:normal\">Comments</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">You can add a
  simple sentence saying kitty was adopted and if they will join other pets in
  their new home. No other personal information about adopter.</p>
<p class=\"MsoListParagraph\"><br/>
Repeat for <span style='font-family:\"Apple Color Emoji\"'>🐈🐈</span>.
</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "How to add Adoption Memo on the Cat"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "How to add Adoption Memo on the Cat", "img": "12-memo-on-pet.png", "desc": "Outcome memo on Cat", "bullets": []}]}, {"id": "step17", "num": 17, "title": "Step 17: Has the association been updated?", "section": "After adopter leaves", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves</i></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-left:.25in\">Update the person
association to Adopter </p>
<p class=\"MsoListParagraphCxSpMiddle\"> </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>On the Person page, go to Associations tab</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>If \"Adopter\" is already listed
(previously adopted an FKR kitty), click “continue” below to proceed to next
step</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>If no “Adopter” listed, then:</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-left:1.0in;text-indent:-.25in\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
</span></span><span dir=\"LTR\"></span>Note the Subtype on the “Potential Adopter”
row.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-left:1.0in;text-indent:-.25in\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
</span></span><span dir=\"LTR\"></span>Click the green +</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"width:5.65in;margin-left:1.0in;border-collapse:collapse;border:none\" width=\"542\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Type</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Adopter</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Should match the one from “Potential
  Adopter”</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>If adopter was a walk in, select the same
  subtype as noted on page 2 of the Consultation Form</p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Type</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Adopter</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Should match the one from “Potential
  Adopter”</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>If adopter was a walk in, select the same
  subtype as noted on page 2 of the Consultation Form</p>
<p class=\"MsoListParagraph\"> </p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "Show the Association form"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Show the Association form", "img": "13-Association.png", "desc": "Association form", "bullets": []}]}, {"id": "step18", "num": 18, "title": "Step 18: Have ADA forms been uploaded to the cat record?", "section": "After adopter leaves – Document Uploads", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves – Document Uploads</i></p>
<p class=\"MsoNormal\">Scan Document:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Place Adoption Disclosure Document (Kitten
or Medical) in scanner and push button</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Save to Downloads folder with filename in
format: \"<b><u><span style=\"background:yellow\">Adoption Disclosure
Agreement - kitty name”</span></u></b></p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>If Medical ADA: <b><u><span style=\"color:#8064A2;background:yellow\">Medical ADA - kitty name</span></u></b></p>
<p class=\"MsoNormal\">Create file in PP:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>On the Cat record, go to Memos/Files </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click on green + sign next to Files</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Name</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">\"Signed
  Kitten ADA - kitty name\" and/or <br/>
  \"Signed Medical ADA - kitty name\"</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Type</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Document</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Disclosure Agreement - ADA</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Expiration</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraph\" style=\"margin:0in;line-height:normal\">Select Files</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Browse to
  Downloads folder and select files. </p>
</td>
</tr>
</table>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Name</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">\"Signed
  Kitten ADA - kitty name\" and/or <br/>
  \"Signed Medical ADA - kitty name\"</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Type</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Document</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Disclosure Agreement - ADA</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Expiration</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
<p class=\"MsoListParagraph\" style=\"margin:0in;line-height:normal\">Select Files</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Browse to
  Downloads folder and select files. </p>
<p class=\"MsoListParagraphCxSpFirst\"> </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Upload</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Tear up and throw away the signed ADA</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "Show ADA File Upload form"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Show ADA File Upload form", "img": "14-ADA-File_upload.png", "desc": "ADA upload example", "bullets": []}]}, {"id": "step19", "num": 19, "title": "Step 19: Has the consultation form been uploaded?", "section": "After adopter leaves – Document Uploads", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves – Document Uploads</i></p>
<p class=\"MsoNormal\">Scan Document:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Place Consultation Form in scanner and push
button</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Save to Downloads folder with filename in
format: \"<b><u>Consultation Form -Adopter's Name<span style=\"background:
yellow\">”</span></u></b></p>
<p class=\"MsoNormal\">Create file in PP:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>On the Person record, go to Memos/Files </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click on green + sign next to Files</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.5in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Name</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Consultation
  Form</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Type</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Document</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Consultation </p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Expiration</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraph\" style=\"margin:0in;line-height:normal\">Select Files</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Browse to
  Downloads folder and select files. </p>
</td>
</tr>
</table>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Name</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Consultation
  Form</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Type</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Document</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Subtype</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\">Adoption
  Consultation </p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin:0in;line-height:normal\">Expiration</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin:0in;line-height:normal\"><i>Leave
  blank</i></p>
<p class=\"MsoListParagraph\" style=\"margin:0in;line-height:normal\">Select Files</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Browse to
  Downloads folder and select files. </p>
<p class=\"MsoListParagraphCxSpFirst\"> </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Upload</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Tear up and throw away the Consultation Form</p>
<p class=\"MsoListParagraphCxSpLast\"> </p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "Show CF File Upload form"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Show CF File Upload form", "img": "15-CF-form-upload.png", "desc": "Consultation form upload example", "bullets": []}]}, {"id": "step20", "num": 20, "title": "Step 20: Has the receipt been entered in PetPoint?", "section": "After adopter leaves – Receipts", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves – Receipts </i></p>
<p class=\"MsoNormal\">Create a Receipt in PP:</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>ON the Person page, in top right corner,
click green +</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Choose Receipt<br/>
<br/>
</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:1.0in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Cash Drawer</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Choose how
  the adopter pays</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Reference</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">If card used,
  add card type (Visa, MC, Discover, etc) and last 4 numbers of card from the
  Payment Slip.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Animals</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Enter the name of kitty adopted to search
  and add.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span><span style='font-family:\"Apple Color Emoji\"'>🐈🐈</span> 
  Repeat for multiple kitties </p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Person</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Make sure
  adopter is listed</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Items</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Choose the item based on Kitty’s age.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-bottom:0in;text-indent:
  -.25in;line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>For single kitty, it will default kitty info.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-bottom:0in;text-indent:
  -.25in;line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>For <span style='font-family:\"Apple Color Emoji\"'>🐈🐈
  </span>:<span style='font-family:\"Apple Color Emoji\"'> </span></p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-top:0in;margin-right:0in;
  margin-bottom:0in;margin-left:1.0in;text-indent:-.25in;line-height:normal\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
  </span></span><span dir=\"LTR\"></span>Details will pop-up, select the Kitty from
  the list.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-top:0in;margin-right:0in;
  margin-bottom:0in;margin-left:1.0in;text-indent:-.25in;line-height:normal\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
  </span></span><span dir=\"LTR\"></span>Add another item based on second kitty’s
  age</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-top:0in;margin-right:0in;
  margin-bottom:0in;margin-left:1.0in;text-indent:-.25in;line-height:normal\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
  </span></span><span dir=\"LTR\"></span>Details will pop-up, select second kitty
  from list. </p>
<p class=\"MsoNormal\" style=\"margin-top:0in;margin-right:0in;margin-bottom:0in;
  margin-left:.25in;line-height:normal\"> </p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Cash Drawer</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Choose how
  the adopter pays</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Reference</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">If card used,
  add card type (Visa, MC, Discover, etc) and last 4 numbers of card from the
  Payment Slip.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Animals</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Enter the name of kitty adopted to search
  and add.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span><span style='font-family:\"Apple Color Emoji\"'>🐈🐈</span> 
  Repeat for multiple kitties </p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Person</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Make sure
  adopter is listed</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Items</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-bottom:0in;text-indent:-.25in;
  line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
  </span></span><span dir=\"LTR\"></span>Choose the item based on Kitty’s age.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-bottom:0in;text-indent:
  -.25in;line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>For single kitty, it will default kitty info.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-bottom:0in;text-indent:
  -.25in;line-height:normal\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>For <span style='font-family:\"Apple Color Emoji\"'>🐈🐈
  </span>:<span style='font-family:\"Apple Color Emoji\"'> </span></p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-top:0in;margin-right:0in;
  margin-bottom:0in;margin-left:1.0in;text-indent:-.25in;line-height:normal\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
  </span></span><span dir=\"LTR\"></span>Details will pop-up, select the Kitty from
  the list.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-top:0in;margin-right:0in;
  margin-bottom:0in;margin-left:1.0in;text-indent:-.25in;line-height:normal\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
  </span></span><span dir=\"LTR\"></span>Add another item based on second kitty’s
  age</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-top:0in;margin-right:0in;
  margin-bottom:0in;margin-left:1.0in;text-indent:-.25in;line-height:normal\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
  </span></span><span dir=\"LTR\"></span>Details will pop-up, select second kitty
  from list. </p>
<p class=\"MsoNormal\" style=\"margin-top:0in;margin-right:0in;margin-bottom:0in;
  margin-left:.25in;line-height:normal\"> </p>
<p class=\"MsoNormal\"> </p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>If any discounts, click the button below for
steps before continuing.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Pay button</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>In the next pop-up, for Type – ALWAYS choose
<b><u>“Cash” </u></b></p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Save</p>
<p class=\"MsoNormal\"> </p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "Where to create Receipt"}, {"kind": "help", "label": "How to complete Receipt form?"}, {"kind": "help", "label": "How to"}, {"kind": "help", "label": "🐈🐈"}, {"kind": "help", "label": "Multi-Cat Receipt form?"}, {"kind": "help", "label": "What if there is a discount?"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Where to create Receipt", "img": "16-new-receipt-on-person.png", "desc": "New receipt from person record", "bullets": []}, {"title": "Help overlay text (How to complete Receipt", "img": "17-receipt-form.png", "desc": "Receipt form and payment panel", "bullets": ["form?):"]}, {"title": "Where to create Receipt", "img": "18-multi-cat-receipt-on-person.png", "desc": "Multi cat receipt example", "bullets": []}, {"title": "What if there is a discount?", "img": null, "desc": null, "bullets": ["If discounting the fee of the cat(s), do the following steps :", "Click on the Green Pencil icon on the right", "line of the cat with the discounted fee.", "Add the discount - either % or $ amount", "Review that the subtotal is correct", "Select the appropriate Discount Reason", "o", "When using the ·other\" reason, add", "information regarding the situation and who approved the discount.", "Click Save"]}]}, {"id": "step21", "num": 21, "title": "Step 21: Has the calendar been updated?", "section": "After adopter leaves - Calendar", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves - Calendar</i></p>
<p class=\"MsoNormal\">Update the appointment with correct notes or outcome:<br/>
<br/>
</p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-left:.25in;text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click the Calendar icon to open the Visual
Calendar window.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-left:.25in;text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Double-click on the adoption appointment you
are working on. An Appointment Overview box will pop up. </p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin-left:.25in;text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Scroll down and click the blue \"Edit
Appointment\" Box.</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-left:.25in;text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Page will open behind the \"Adoption
Overview\" screen. Be sure to go to that screen.</p>
<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" class=\"MsoTableGrid\" style=\"margin-left:.25in;border-collapse:collapse;border:none\">
<tr>
<td style=\"border:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
</td>
<td style=\"border:solid windowtext 1.0pt;border-left:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Leave the
  selected \"Meet and Greet”</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">there.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Status</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Select
  \"Completed\".</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Status Reason</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Select
  \"Adopted\" or \"Did Not</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Adopt\"
  as appropriate.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Start
  Date/Time</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Enter the
  date and time the</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">appointment
  was scheduled to start.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">End Date/Time</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Enter the
  date and time the appointment was scheduled to end (one hour after the
  start).<br/>
  If the appointment ended early and you are updating the calendar before the
  scheduled end time, you may enter the current time.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Assigned To</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Select your
  name under the drop-down menu or</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">\"Fearless
  Kitty Rescue\" if your name is not listed.</p>
</td>
</tr>
<tr>
<td style=\"border:solid windowtext 1.0pt;border-top:none;
  padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Calendar
  color</p>
</td>
<td style=\"border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt\" valign=\"top\">
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Leave it to
  whatever is selected (usually pink).</p>
</td>
</tr>
</table>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Subtype</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Leave the
  selected \"Meet and Greet”</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">there.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Status</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Select
  \"Completed\".</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Status Reason</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Select
  \"Adopted\" or \"Did Not</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Adopt\"
  as appropriate.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Start
  Date/Time</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Enter the
  date and time the</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">appointment
  was scheduled to start.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">End Date/Time</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Enter the
  date and time the appointment was scheduled to end (one hour after the
  start).<br/>
  If the appointment ended early and you are updating the calendar before the
  scheduled end time, you may enter the current time.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Assigned To</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Select your
  name under the drop-down menu or</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">\"Fearless
  Kitty Rescue\" if your name is not listed.</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Calendar
  color</p>
<p class=\"MsoNormal\" style=\"margin-bottom:0in;line-height:normal\">Leave it to
  whatever is selected (usually pink).</p>
<p class=\"MsoNormal\"> </p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"margin-left:.25in;text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Click Submit Appointment</p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-left:.25in\"> </p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "help", "label": "How to update Calendar"}, {"kind": "back", "label": "Back"}], "helps": [{"title": "Help overlay text (How to update Calendar: show", "img": null, "desc": null, "bullets": ["19-edit-appointment.png"]}]}, {"id": "step22", "num": 22, "title": "Step 22: Has the photo been texted to Kim?", "section": "After adopter leaves", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves</i></p>
<p class=\"MsoNormal\">Send the approved adoption photo for social media or
records.</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step23", "num": 23, "title": "Step 23: Has the Outlook follow up email been sent?", "section": "After adopter leaves", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves</i></p>
<p class=\"MsoNormal\">Send the Outlook adoption email with cats adopted, PP done,
whether photo was sent, and counselor names.</p>", "buttons": [{"kind": "next", "label": "Yes - continue"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step24", "num": 24, "title": "Step 24: Have the payment & slips been filed?", "section": "After adopter leaves - Payments", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves - Payments</i></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Place completed payment slip with card or
check in Barbs folder </p>
<p class=\"MsoListParagraphCxSpLast\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>If adopter paid with cash, place payment
slip/cash in black lock box.</p>", "buttons": [], "helps": []}, {"id": "step25", "num": 25, "title": "Step 25: Have whiteboards been updated?", "section": "After adopter leaves - Boards", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: After adopter leaves - Boards</i></p>
<p class=\"MsoListParagraphCxSpFirst\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Room White Board: Remove kitty's name or the
photo in frame.</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Large White Board by Medical: Remove kitty's
name</p>
<p class=\"MsoListParagraphCxSpMiddle\" style=\"text-indent:-.25in\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>      
</span></span><span dir=\"LTR\"></span>Adoption Board: Write next number, kitty's
name, circled A, and date. </p>
<p class=\"MsoListParagraphCxSpLast\" style=\"margin-left:1.0in;text-indent:-.25in\"><span style='font-family:\"Courier New\"'>o<span style='font:7.0pt \"Times New Roman\"'>  
</span></span><span dir=\"LTR\"></span>If FTA- add in lower right section of
Adoption Board.</p>", "buttons": [{"kind": "next", "label": "Yes - all wrap up tasks done"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step26_wrap", "num": 26, "title": "Step 26: Wrap up - no adoption", "section": "No adoption", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: No adoption</i></p>
<p class=\"MsoNormal\">If no cat was adopted, make sure the notes and future follow
up are clear.</p>
<p class=\"MsoNormal\">Checklist:</p>
<p class=\"MsoListBulletCxSpFirst\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Add Future adopt - needs discussion memo if needed on the Person
page</p>
<p class=\"MsoListBulletCxSpMiddle\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Upload consultation form to Person record</p>
<p class=\"MsoListBulletCxSpLast\"><span style=\"font-family:Symbol\">·<span style='font:7.0pt \"Times New Roman\"'>       </span></span><span dir=\"LTR\"></span>Update calendar with correct reason</p>", "buttons": [{"kind": "help", "label": "All done"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step26_stop", "num": 26, "title": "Step 26: Stop and notify staff", "section": "Pause", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Pause</i></p>
<p class=\"MsoNormal\">When you have a concern, step out of the room and talk to
staff before continuing.</p>", "buttons": [{"kind": "help", "label": "Situation resolved - restart"}, {"kind": "back", "label": "Back"}], "helps": []}, {"id": "step27", "num": 27, "title": "Step 27: Checklist complete", "section": "Complete", "bodyHtml": "<p class=\"MsoNormal\"><i>Section: Complete</i></p>
<p class=\"MsoNormal\">You are done with this case. Tap below to start over.</p>", "buttons": [{"kind": "help", "label": "Start again"}], "helps": []}];

let currentId = STEPS[0]?.id || null;
let interactionType = null; // "appointment" | "walkin"

const elJump = document.getElementById('jumpSelect');
const elStartOver = document.getElementById('btn-startover');
const elProgressLabel = document.getElementById('progressLabel');
const elProgressFill = document.getElementById('progressFill');
const elSectionName = document.getElementById('sectionName');
const elStepTitle = document.getElementById('stepTitle');
const elStepBody = document.getElementById('stepBody');
const elButtonsRow = document.getElementById('buttonsRow');

const helpOverlay = document.getElementById('helpOverlay');
const helpClose = document.getElementById('helpClose');
const helpTitle = document.getElementById('helpTitle');
const helpContent = document.getElementById('helpContent');

function idxById(id){
  return STEPS.findIndex(s => s.id === id);
}

function setProgress(){
  const i = idxById(currentId);
  const n = Math.max(STEPS.length, 1);
  elProgressLabel.textContent = `Step ${i >= 0 ? (i+1) : 1}`;
  elProgressFill.style.width = `${((i+1)/n)*100}%`;
}

function renderJump(){
  elJump.innerHTML = '';
  STEPS.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = s.id;
    let label = s.title;
    if (s.id === 'step26_wrap') label = 'Step 26: Wrap up - no adoption';
    if (s.id === 'step26_stop') label = 'Step 26: Stop and notify staff';
    const nice = label.replace(/^Step\s+\d+\s*:\s*/i,'');
    opt.textContent = `${i+1}. ${nice}`;
    elJump.appendChild(opt);
  });
  elJump.addEventListener('change', (e) => {
    goto(e.target.value);
  });
}

function cleanBodyHtml(html){
  return (html || '')
    .replace(/<p[^>]*>\s*<i>\s*Section:\s*[^<]+<\/i>\s*<\/p>/gi,'')
    .replace(/class="Mso[^"]*"/g, '')
    .replace(/class=Mso[^\s>]+/g, '');
}

function escapeHtml(s){
  return String(s || '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}

function openHelp(item){
  helpTitle.textContent = item.title || 'Help';
  let html = '';
  if (item.img){
    html += `<img src="${item.img}" alt="${escapeHtml(item.title || 'Help')}">`;
  }
  if (item.desc){
    html += `<div class="desc">${escapeHtml(item.desc)}</div>`;
  }
  if (item.bullets && item.bullets.length){
    html += `<ul>${item.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`;
  }
  helpContent.innerHTML = html || '<p>No help content available.</p>';
  helpOverlay.classList.add('active');
  helpOverlay.setAttribute('aria-hidden', 'false');
}

function closeHelp(){
  helpOverlay.classList.remove('active');
  helpOverlay.setAttribute('aria-hidden', 'true');
}

helpClose.addEventListener('click', closeHelp);
helpOverlay.addEventListener('click', (e) => {
  if (e.target === helpOverlay) closeHelp();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeHelp();
});

function buildButtons(step){
  elButtonsRow.innerHTML = '';
  const btns = step.buttons || [];
  const helps = step.helps || [];

  const add = (label, style, onClick) => {
    const b = document.createElement('button');
    b.className = `btn ${style}`;
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', onClick);
    elButtonsRow.appendChild(b);
  };

  function nextLinear(){
    const i = idxById(currentId);
    if (i >= 0 && i < STEPS.length - 1) goto(STEPS[i+1].id);
  }
  function prevLinear(){
    const i = idxById(currentId);
    if (i > 0) goto(STEPS[i-1].id);
  }

  // Build primary/back buttons first (skip help placeholders)
  btns.forEach((b) => {
    if (b.kind === 'help' || b.kind === 'restart') return;

    if (b.kind === 'back'){
      add('Back', 'outline', () => {
        if (step.id === 'step4'){
          if (interactionType === 'appointment') return goto('step2');
          if (interactionType === 'walkin') return goto('step3');
        }
        prevLinear();
      });
      return;
    }

    if (step.id === 'step1'){
      const lower = (b.label || '').toLowerCase();
      if (lower.includes('scheduled')){
        add('Scheduled appointment', 'outline', () => {
          interactionType = 'appointment';
          goto('step2');
        });
        return;
      }
      if (lower.includes('walk')){
        add('Walk in', 'outline', () => {
          interactionType = 'walkin';
          goto('step3');
        });
        return;
      }
    }

    if (step.id === 'step4'){
      const lower = (b.label || '').toLowerCase();
      if (lower.startsWith('no')){
        add(b.label, 'primary', () => goto('step5'));
        return;
      }
      if (lower.startsWith('yes')){
        add(b.label, 'danger', () => goto('step26_stop'));
        return;
      }
    }

    if (step.id === 'step5'){
      const lower = (b.label || '').toLowerCase();
      if (lower.startsWith('yes')){
        add(b.label, 'primary', () => goto('step6'));
        return;
      }
      if (lower.startsWith('no')){
        add(b.label, 'danger', () => goto('step26_wrap'));
        return;
      }
    }

    if (b.kind === 'next'){
      add(b.label, 'primary', () => {
        if (step.id === 'step2' || step.id === 'step3') return goto('step4');
        nextLinear();
      });
      return;
    }

    if (b.kind === 'branch_no'){
      add(b.label, 'danger', () => nextLinear());
      return;
    }
  });

  // Insert help buttons before Back if Back exists
  const backBtn = Array.from(elButtonsRow.children).find(x => x.textContent.trim().toLowerCase() === 'back') || null;
  helps.forEach(h => {
    const b = document.createElement('button');
    b.className = 'btn outline';
    b.type = 'button';
    b.textContent = h.title || 'Help';
    b.addEventListener('click', () => openHelp(h));
    if (backBtn) elButtonsRow.insertBefore(b, backBtn);
    else elButtonsRow.appendChild(b);
  });
}

function goto(id){
  const step = STEPS.find(s => s.id === id);
  if (!step) return;

  currentId = id;
  elJump.value = id;

  elSectionName.textContent = (step.section || '').toUpperCase() || 'WORKFLOW';
  elStepTitle.textContent = step.title;

  elStepBody.innerHTML = cleanBodyHtml(step.bodyHtml);

  buildButtons(step);
  setProgress();

  window.scrollTo({ top: 0, behavior: 'instant' });
}

elStartOver.addEventListener('click', () => {
  interactionType = null;
  goto('step1');
});

renderJump();
goto('step1');
