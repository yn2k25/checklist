
window.STEPS = [
  {
    id:1,
    title:"What type of interaction is this?",
    content:`
      <button class="primary" data-next="2">Scheduled appointment</button>
      <button class="primary" data-next="3">Walk in</button>
    `
  },
  {
    id:2,
    title:"Appointment prep",
    content:`
      <div class="accordion">
        <div class="acc-head">Check PP for Consultation Form</div>
        <div class="acc-body">
          <ul>
            <li>Find the person in PP</li>
            <li>Click Memos/Files</li>
            <li>Scroll to Memos section</li>
            <li>Find “Consultation Form”</li>
            <li>Review information</li>
          </ul>
          <button class="outline" data-help="cf_location">Where is the CF in PP?</button>
        </div>
      </div>

      <div class="accordion">
        <div class="acc-head">Check PP for Do Not Adopt (DNA)</div>
        <div class="acc-body">
          <ul>
            <li>If there is an alert for DNA, it will pop up</li>
            <li>Also check memos for DNA note</li>
          </ul>
          <button class="outline" data-help="dna_location">Where to check DNA?</button>
        </div>
      </div>

      <button class="primary" data-next="4">Continue</button>
      <button class="outline" data-back>Back</button>
    `
  }
];
