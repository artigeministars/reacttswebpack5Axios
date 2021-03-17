module.exports = {
    "dataSource": "commits",
    "prefix": "gemini",
    "includeMessages": "all",
    "ignoreCommitsWith": ["geminiignore", "grenignore", "geminiskip", "grenskip"],
    "ignoreTagsWith": ["geminiignoretag", "grenignoretag", "geminiskiptag", "grenskiptag"],
    "changelogFilename": "CHANGELOG.md",
    "template": {
        commit: ({ message, url, author, name }) => `- [${message}](${url}) - ${author ? `@${author}` : name}`,
        issue: "- {{labels}} {{name}} [{{text}}]({{url}})",
        label: "[**{{label}}**]",
        noLabel: "closed",
        group: "\n#### {{heading}}\n",
        changelogTitle: "# Changelog\n\n",
        release: "## {{release}} ({{date}})\n{{body}}",
        releaseSeparator: "\n---\n\n"
    }
}