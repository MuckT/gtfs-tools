import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import Ajv from "ajv"
import addFormats from "ajv-formats"

@Component({
  selector: 'gtfs-tools-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'json-schema-validation';
  fileToUpload: File = null;
  selectedSchema = 0;

  // Schemas
  // agency-schema
  agencySchema = {
    "type": "array",
    "title": "The Agency.txt Schema",
    "uniqueItems": true,
    "description": "A schema to validate agency.txt files converted to json object arrays",
    "items": {
      "allOf": [
        {
          "type": "object",
          "required": [
              "agency_name",
              "agency_url",
              "agency_timezone"
          ],
          "properties": {
            "agency_id": {
              "type": "string",
              "title": "Agency ID",
              "description": "The agency_id field is an ID that uniquely identifies a transit agency. A transit feed may represent data from more than one agency. The agency_id is dataset unique.",
            },
            "agency_name": {
              "type": "string",
              "title": "Agency Name",
              "description": "The agency_name field contains the full name of the transit agency. Google Maps will display this name.",
            },
            "agency_url": {
              "type": "string",
              "title": "Agency URL",
              "description": "Contains the URL of the transit agency. The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.",
              "format": "uri"
            },
            "agency_timezone": {
              "type": "string",
              "title": "Agency Timezone",
              "description": "Contains the timezone where the transit agency is located."
            },
            "agency_lang": {
              "type": "string",
              "title": "Agency language",
              "description": "Contains a two-letter ISO 639-1 code for the primary language used by this transit agency. The language code is case-insensitive (both en and EN are accepted). This setting defines capitalization rules and other language-specific settings for all text contained in this transit agency's feed. Please refer to http://www.loc.gov/standards/iso639-2/php/code_list.php for a list of valid values."
            },
            "agency_phone": {
              "type": "string",
              "title": "Agency Phone",
              "description": "Contains a single voice telephone number for the specified agency. This field is a string value that presents the telephone number as typical for the agency's service area. It can and should contain punctuation marks to group the digits of the number. Disable text (for example, TriMet's 503-238-RIDE) is permitted, but the field must not contain any other descriptive text."
            },
            "agency_fare_url": {
              "type": "string",
              "title": "Agency Fare URL",
              "description": "The agency_fare_url specifies the URL of a web page that allows a rider to purchase tickets or other fare instruments for that agency online. The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.",
              "format": "uri"
            },
            "agency_email": {
              "type": "string",
              "title": "Agency Email",
              "description": "Contains a single valid email address actively monitored by the agency’s customer service department. This email address will be considered a direct contact point where transit riders can reach a customer service representative at the agency.",
              "format": "email"
            }
          },
          "additionalProperties": true
        }
      ]
    }
  }

  // Calendar Schema
  // Calendar Dates Schema
  // Fare Attributes Schema
  // Fare Rules Schema
  // Fare Info Schema
  // Frequencies Schema
  // Routes Schema
  // Shapes Schema
  // Stop Times Schema
  // Stops Schema
  // Transfers Schema
  // Trips Schema

  // Schema Options for UI
  schemaOptions = [
    {id: 0, name: "Agency", schema: this.agencySchema},
    {id: 1, name: "Calendar"},
    {id: 2, name: "Calendar Dates"},
    {id: 3, name: "Fare Attributes"},
    {id: 4, name: "Fare Rules"},
    {id: 5, name: "Feed Info"},
    {id: 6, name: "Frequencies"},
    {id: 7, name: "Routes"},
    {id: 8, name: "Shapes"},
    {id: 9, name: "Stop Times"},
    {id: 10, name: "Stops"},
    {id: 11, name: "Transfers"},
    {id: 12, name: "Trips"}
  ]

  // Functions used in UI
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleSchemaInput(event: any) {
    this.selectedSchema = event.target.value;
  }

  runValidation() {
    // Setup validator
    const ajv = new Ajv({allErrors: true});
    addFormats(ajv)
    const validate = ajv.compile(this.schemaOptions[this.selectedSchema].schema);

    // Convert a .txt or .csv to json
    Papa.parse(this.fileToUpload, {
      // Parameters to set
      download: false,
      header: true,
      complete: function(results) {
        const valid = validate(results.data);
        if (!valid) {
          console.log("Some Errors Found: ")
          console.log(validate.errors)
        } else {
          console.log("No Errors Found!")
        }
      }
    });
  }
}
