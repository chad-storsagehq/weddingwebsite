function doPost(e) {
  var spreadsheetId = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
  var sheetName = 'RSVP Responses';
  var payload = JSON.parse(e.postData.contents || '{}');

  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);

  sheet.appendRow([
    payload.submitted_at || new Date().toISOString(),
    payload.attendance || '',
    payload.name || '',
    payload.party_size || 0,
    payload.attending_ceremony === true ? 'Yes' : 'No',
    payload.attending_reception === true ? 'Yes' : 'No',
    payload.dietary_restrictions || '',
    payload.source || '',
    'New'
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
