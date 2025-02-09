---
title: "Contributing Translations"
weight: 4010035
author: "Ilia Ross"
---

## About translation files

A complete list of supported languages and language codes can be found in the Webmin [translation documentation](https://webmin.com/docs/development/translations/#how-translations-are-made).

Each module or plugin contains two types of translation files for each language, which may need to be created if they don't exist yet:
- Main file (e.g., `de`) - Contains human-reviewed and verified translations
- Auto file (e.g., `de.auto`) - Contains machine translations generated automatically using Google Translate. These translations need human review before being moved to the main file.

## File structure overview

```
virtualmin-gpl/
└── lang/          # Module translations
    ├── en         # Source of truth (English)
    ├── de         # Human-reviewed German translations
    ├── de.auto    # Auto-generated German translations (by Google Translate)
    ├── fr         # Human-reviewed French translations
    └── fr.auto    # Auto-generated French translations (by Google Translate)
```

## Contributing translations

### Using Git

```bash
# Clone the repository
git clone https://github.com/virtualmin/virtualmin-gpl.git
cd virtualmin-gpl

# Add your fork as a remote (replace YOUR-USERNAME)
git remote add fork https://github.com/YOUR-USERNAME/virtualmin-gpl.git

# Create a branch for your translations using your language code (e,g., fr)
git checkout -b translate-fr

# Make your changes, commit and push
git commit -m "lang(fr): Update translations"
git push origin translate-fr
```

Yes, we can add a section about using GitHub UI right after the Git instructions section. Here's what to add after the Git commands block and before "Translation guidelines":

### Using GitHub UI

1. **Create a fork**
   - Visit https://github.com/virtualmin/virtualmin-gpl
   - Click the "Fork" button in the top-right corner
   - Wait for your fork to be created

2. **Navigate to files**
   - Go to the `lang` directory in your fork
   - Find your language files (e.g., `de` and `de.auto`)

3. **Edit or create files**
   - If your language file exists, click it and then the pencil icon to edit
   - If it doesn't exist, click "Add file" > "Create new file" and name it with your language code
   - Make your changes following the guidelines below
   - Scroll down and click "Commit changes"

4. **Create Pull Request**
   - Click "Pull requests" tab
   - Click "New pull request"
   - Select "virtualmin/virtualmin-gpl" as the base repository
   - Add a descriptive title like "lang(de): Update translations"
   - Click "Create pull request"

### Using forum or email

If you're not comfortable with Git or GitHub, you can contribute translations in two other ways:

1. **Virtualmin forum**
   - Visit the [Virtualmin Community Forum](https://forum.virtualmin.com)
   - Create a new topic in the "Development" category
   - Include your language code in the title
   - Attach your translation file or paste the translations

2. **Email**
   - Send your translations to [developers&#x40;virtualmin&#x2e;dev](mailto:developers&#x40;virtualmin&#x2e;dev)
   - Include your language code in the email subject
   - Attach the translation file or include translations in the email body
   - Clearly indicate which module or plugin the translations are for

## Translation guidelines

### Key rules

1. **Maintain exact formatting**
   ```
   # English source (en):
   index_version=Nginx version $1
   
   # Correct German translation:
   index_version=Nginx-Version $1
   
   # WRONG:
   index_version = Nginx version $1.
   ```

2. **Handle variables correctly**
   ```
   # English source (en):
   opt_missing=Nothing entered for field : $1
   
   # Correct French translation:
   opt_missing=Aucune valeur saisie pour le champ : $1
   
   # WRONG:
   opt_missing=Aucune valeur saisie pour le champ : %1
   opt_missing=Aucune valeur saisie pour le champ.
   ```

3. **UTF-8 encoding**
   - All files must use UTF-8 encoding
   - Save files without BOM
   - Test special characters display correctly

### Best practices

#### Review process
   - Use `en` file for source text
   - Check your language's `.auto` file for suggestions
   - Move correct translations to main language file
   - Keep technical terms consistent

#### Quality checks
   - Compare with English source
   - Keep dots and colons exactly as in source
   - Preserve all variables (`$1`, `$2`, etc.)
   - Maintain HTML tags if present

## Understanding machine translations

The `.auto` files are automatically generated using machine translation. Here's what you need to know:

### Purpose
   - Provide initial translations as starting point
   - Help translators with basic translations
   - Speed up translation process

### Usage
   - Create new language file if it doesn't exist
   - Use `.auto` files as reference if available
   - Review machine translations for accuracy
   - Improve and correct translations
   - Move verified translations to main language file

### Important notes
   - Machine translations may be literal or incorrect
   - Technical terms might need adjustment
   - Always verify context and meaning
   - Don't blindly copy from `.auto` files

## Common pitfalls

   - Don't add/remove punctuation
   - Don't change variable placeholders
   - Don't modify HTML tags
   - Don't add extra spaces

## Testing

- Switch language in Webmin interface
- Check translated strings
- Verify variables work
- Test special characters

## Need help?

Create an [issue](https://github.com/virtualmin/virtualmin-gpl/issues/new?template=Blank+issue) with:
- Your language
- Source text
- Current translation
- What you need help with

Thank you for helping improve translations!