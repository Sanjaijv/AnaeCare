import os
import re

def replace_in_file(path, old, new):
    if not os.path.exists(path): return
    with open(path, 'r') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)

# Fix typography properties
files_with_typo = [
    'components/feature/ExtractionAnimation.tsx',
    'components/feature/FeatureSummary.tsx',
    'screens/FeatureReview/FeatureReviewScreen.tsx'
]
for f in files_with_typo:
    replace_in_file(f, 'typography.fontFamily.medium', 'typography.fontFamily')
    replace_in_file(f, 'typography.fontFamily.bold', 'typography.fontFamily')
    replace_in_file(f, 'typography.fontFamily.regular', 'typography.fontFamily')
    replace_in_file(f, 'theme.borderRadius.md', '8')
    replace_in_file(f, 'colors.textLight', 'colors.textSecondary')

# Fix AppButton usage in FeatureReviewScreen
replace_in_file('screens/FeatureReview/FeatureReviewScreen.tsx', '<Button title=', '<Button label=')

# Fix PredictionProcessingScreen imports and variants
pred_screen = 'screens/Prediction/PredictionProcessingScreen.tsx'
replace_in_file(pred_screen, "import { Button } from '../../components/ui/Button';", "import { AppButton as Button } from '../../components/buttons/AppButton';")
replace_in_file(pred_screen, 'variant="h2"', 'variant="headlineSmall"')
replace_in_file(pred_screen, 'variant="h3"', 'variant="titleLarge"')
replace_in_file(pred_screen, 'variant="h4"', 'variant="titleMedium"')

print("Done fixing final TS errors")
