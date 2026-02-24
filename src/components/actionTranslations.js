/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

const translations = {
  nb: {
    text: {
      FILE_TRANSFER: "Filoverføring",
      FILE_CLASSIFICATION: "Filklassifisering",
      FILE_DELIVERY: "Filleveranse",
      PREVALIDATION: "Prevalidering",
      LINKING: "Lenking",
      FILTERING: "Filtrering",
      IMPORT: "Import",
      EXPORT: "GTFS-eksport",
      EXPORT_NETEX: "NeTEx-eksport",
      VALIDATION_LEVEL_1: "Validering nivå 1",
      DATASPACE_TRANSFER: "Overføring sentral database",
      VALIDATION_LEVEL_2: "Validering nivå 2",
      EXPORT_NETEX_POSTVALIDATION: "Postvalidering",
      EXPORT_NETEX_MERGED_POSTVALIDATION: "Validering av sammenslått datasett",
      OTP2_BUILD_GRAPH: "Bygg av reisesøkforslag (otp2)",
      EXPORT_NETEX_BLOCKS: "Eksport av NeTEx blocks",
      EXPORT_NETEX_BLOCKS_POSTVALIDATION: "NeTEx blocks postvalidering",
      UNKNOWN: "Ukjent steg",
    },
    title: {
      FILE_TRANSFER: "Overføring av fil fra lokal maskin til sentral server",
      LINKING: "Berikelse av NeTEx-data med servicelinks",
      FILTERING: "Filtrering av data i den nye importprosessen",
      IMPORT: "Filvalidering og import i lokalt databaseområde nivå 1",
      EXPORT: "Eksport av rutedata ",
      VALIDATION_LEVEL_1: "Validering av komplett dataområde nivå 1",
      VALIDATION_LEVEL_2: "Validering av komplett dataområde nivå 2",
      DATASPACE_TRANSFER: "Overføring til sentralt databaseområde nivå 2",
      OTP2_BUILD_GRAPH: "Bygg av reisesøkforslag (otp2)",
      EXPORT_NETEX_BLOCKS: "Eksport av NeTEx blocks",
      UNKNOWN: "Dette steget er ukjent",
    },
    filename: {
      undefined: "Validering",
    },
    states: {
      ALL: "Alle",
      OK: "Fullført",
      PENDING: "Venter",
      STARTED: "Påbegynt",
      FAILED: "Feil",
      DUPLICATE: "Feil - duplikat datasett",
      IGNORED: "Ikke gjennomført",
      CANCELLED: "Kansellert",
      TIMEOUT: "Tidsavbrudd",
    },
    errorMessage: {
      FILE_TRANSFER: "Filoverføring feilet",
      FILE_CLASSIFICATION: "Filklassifisering feilet",
    },
    errorCode: {
      ERROR_FILE_UNKNOWN_FILE_EXTENSION:
        "Filendelsen er hverken .zip eller .ZIP",
      ERROR_FILE_NOT_A_ZIP_FILE: "Filen er ikke et zip arkiv",
      ERROR_FILE_UNKNOWN_FILE_TYPE: "Filen er hverken NeTEx eller GTFS",
      ERROR_FILE_ZIP_CONTAINS_SUB_DIRECTORIES:
        "Arkivet inneholder underkataloger",
      ERROR_FILE_INVALID_ZIP_ENTRY_ENCODING:
        "Arkivet inneholder filnavn som ikke er gyldig UTF8",
      ERROR_FILE_INVALID_XML_ENCODING_ERROR:
        "Arkivet inneholder XML-filer med ugyldig tegnsett",
      ERROR_FILE_INVALID_XML_CONTENT: "Arkivet inneholder ugyldige XML-filer",
      ERROR_FILE_DUPLICATE: "Samme fil ble allerede importert",
      ERROR_NETEX_EXPORT_EMPTY_EXPORT:
        "Det eksporterte datasettet er tomt (fant ingen aktive tidtabelldata)",
      ERROR_VALIDATION_NO_DATA:
        "Det finnes ingen data å validere. Statusen for siste import bør kontrolleres",
    },
    filterButton: {
      ALL_TIME: "Ubegrenset",
      LAST_12_HOURS: "Siste 12 timene",
      LAST_24_HOURS: "Siste døgn",
      LAST_WEEK: "Siste uke",
      LAST_MONTH: "Siste måned",
    },
  },
  en: {
    text: {
      FILE_TRANSFER: "File transfer",
      FILE_CLASSIFICATION: "File classification",
      FILE_DELIVERY: "File delivery",
      PREVALIDATION: "Pre-validation",
      LINKING: "Linking",
      FILTERING: "Filtering",
      IMPORT: "Import",
      EXPORT: "GTFS export",
      EXPORT_NETEX: "NeTEx export",
      VALIDATION_LEVEL_1: "Validation level 1",
      DATASPACE_TRANSFER: "Transfer to central space",
      VALIDATION_LEVEL_2: "Validation level 2",
      EXPORT_NETEX_POSTVALIDATION: "Post-validation",
      EXPORT_NETEX_MERGED_POSTVALIDATION: "Merged dataset validation",
      OTP2_BUILD_GRAPH: "Build graph",
      EXPORT_NETEX_BLOCKS: "Export NeTEx blocks",
      EXPORT_NETEX_BLOCKS_POSTVALIDATION: "NeTEx blocks post-validation",
      UNKNOWN: "Uknown step",
    },
    title: {
      FILE_TRANSFER: "Upload local file to remote server",
      LINKING: "Enrichment of NeTEx data with service links",
      FILTERING: "Data filtering in the new import process",
      IMPORT: "File validation and import in local data space - level 1",
      EXPORT: "Export of route data ",
      VALIDATION_LEVEL_1: "Validation of complete data space - level 1",
      VALIDATION_LEVEL_2: "Validation of complete data space - level 2",
      DATASPACE_TRANSFER: "Transfer to central dataspace - level 2",
      OTP2_BUILD_GRAPH: "Build graph (otp2)",
      EXPORT_NETEX_BLOCKS: "Export NeTEx blocks",
      UNKNOWN: "This step is uknown",
    },
    filename: {
      undefined: "Validation",
    },
    states: {
      ALL: "All",
      OK: "Completed",
      PENDING: "Pending",
      STARTED: "Started",
      FAILED: "Failed",
      DUPLICATE: "Failed - duplicate data set",
      IGNORED: "Skipped",
      CANCELLED: "Cancelled",
      TIMEOUT: "Timeout",
    },
    errorMessage: {
      FILE_TRANSFER: "Failed to transfer file",
      FILE_CLASSIFICATION: "Failed on file classification",
    },
    errorCode: {
      ERROR_FILE_UNKNOWN_FILE_EXTENSION:
        "The file extension is neither .zip nor .ZIP",
      ERROR_FILE_NOT_A_ZIP_FILE: "The file is not a zip archive",
      ERROR_FILE_UNKNOWN_FILE_TYPE:
        "The file is neither a NeTEx archive nor a GTFS archive",
      ERROR_FILE_ZIP_CONTAINS_SUB_DIRECTORIES:
        "The archive contains sub-directories",
      ERROR_FILE_INVALID_ZIP_ENTRY_ENCODING:
        "The archive contains file names that are not UTF8-encoded",
      ERROR_FILE_INVALID_XML_ENCODING_ERROR:
        "The archive contains XML files with an invalid encoding",
      ERROR_FILE_INVALID_XML_CONTENT: "The archive contains invalid XML files",
      ERROR_FILE_DUPLICATE: "The same file has been already imported",
      ERROR_NETEX_EXPORT_EMPTY_EXPORT:
        "The exported dataset is empty (no active timetable data found)",
      ERROR_VALIDATION_NO_DATA:
        "There is no data to validate. Check the status of the latest data import",
    },
    filterButton: {
      ALL_TIME: "Unlimited",
      LAST_12_HOURS: "Last 12 hours",
      LAST_24_HOURS: "Last 24 hours",
      LAST_WEEK: "Last week",
      LAST_MONTH: "Last month",
    },
  },
};

export default translations;
