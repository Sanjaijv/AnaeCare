import os

replacements = {
    "spacing.m": "spacing.md",
    "spacing.s": "spacing.sm",
    "spacing.l": "spacing.lg",
    "spacing.xl": "spacing.xl",
    "colors.primary.main": "colors.primary",
    "colors.primary.light": "colors.primary",
    "colors.primary.dark": "colors.primary",
    "colors.background.default": "colors.background",
    "colors.background.paper": "colors.surface",
    "colors.background.light": "colors.surface",
    "colors.text.primary": "colors.text",
    "colors.text.secondary": "colors.textSecondary",
    "colors.border.main": "colors.border",
    "colors.border.light": "colors.border",
    "colors.status.success": "colors.success",
    "colors.status.warning": "colors.warning",
    "colors.status.error": "colors.danger",
    "typography.h1": "typography.display",
    "typography.h3": "typography.heading",
    "typography.h4": "typography.title",
    "typography.subtitle1": "typography.subtitle",
    "typography.subtitle2": "typography.subtitle",
    "typography.body1": "typography.body",
    "typography.body2": "typography.body",
    "typography.button": "typography.body",
    "spacing.xs": "spacing.xs",
}

files_to_fix = [
    "components/history/EmptyHistory.tsx",
    "components/history/FilterBar.tsx",
    "components/history/HistoryCard.tsx",
    "components/history/SearchBar.tsx",
    "components/history/StatisticsCard.tsx",
    "components/history/TimelineCard.tsx",
    "components/history/TrendChart.tsx",
    "components/layout/Card.tsx",
    "screens/History/HistoryScreen.tsx",
    "screens/History/PredictionDetailsScreen.tsx",
]

for filepath in files_to_fix:
    full_path = os.path.join("/home/danico/AnaeCare", filepath)
    if not os.path.exists(full_path):
        continue
    with open(full_path, "r") as f:
        content = f.read()
    
    for old, new in replacements.items():
        # A simple string replace. Should be safe enough for these specific keys
        content = content.replace(old, new)
        
    with open(full_path, "w") as f:
        f.write(content)

print("Theme keys fixed.")
