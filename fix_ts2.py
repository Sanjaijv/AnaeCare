import os
import re

def replace_in_file(path, old, new):
    if not os.path.exists(path): return
    with open(path, 'r') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)

def regex_replace_in_file(path, pattern, new):
    if not os.path.exists(path): return
    with open(path, 'r') as f:
        content = f.read()
    content = re.sub(pattern, new, content)
    with open(path, 'w') as f:
        f.write(content)

# Fix feature components theme imports
feature_files = [
    'components/feature/ExtractionAnimation.tsx',
    'components/feature/FeatureProgress.tsx',
    'components/feature/FeatureSummary.tsx',
    'screens/FeatureExtraction/FeatureExtractionScreen.tsx',
    'screens/FeatureReview/FeatureReviewScreen.tsx'
]
for f in feature_files:
    # They currently have `import { colors } from '../../theme/colors';` because of the previous script,
    # but might also still use `theme.x`.
    # Let's just make sure they import colors, spacing, typography and replace theme.x with x.
    replace_in_file(f, "import { theme } from '../../theme';", "import { colors } from '../../theme/colors';\nimport { spacing } from '../../theme/spacing';\nimport { typography } from '../../theme/typography';")
    replace_in_file(f, "theme.colors", "colors")
    replace_in_file(f, "theme.spacing", "spacing")
    replace_in_file(f, "theme.typography", "typography")
    replace_in_file(f, "colors.error", "colors.danger")
    # Also fix if they were already modified by my previous script to import { colors } but still have theme.colors in code
    replace_in_file(f, "import { colors } from '../../theme/colors';\nimport { spacing } from '../../theme/spacing';\nimport { typography } from '../../theme/typography';\nimport { colors } from '../../theme/colors';", "import { colors } from '../../theme/colors';\nimport { spacing } from '../../theme/spacing';\nimport { typography } from '../../theme/typography';")

# Fix PredictionProcessingScreen Text import
replace_in_file('screens/Prediction/PredictionProcessingScreen.tsx', "import { Text } from 'react-native';", "import { Text } from 'react-native-paper';")
replace_in_file('screens/Prediction/PredictionProcessingScreen.tsx', '<Button size="large"', '<Button ')

# Fix PreprocessingScreen uri error
replace_in_file('screens/Preprocessing/PreprocessingScreen.tsx', 
    "const { uri: imageUri } = useSelector((state: RootState) => state.image);", 
    "const imageUri = useSelector((state: RootState) => state.image.currentImage?.uri);")

print("Done fixing remaining TS errors")
