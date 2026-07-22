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

# 1. ConjunctivaSlice types
replace_in_file('store/slices/conjunctivaSlice.ts', 'x: int;', 'x: number;')
replace_in_file('store/slices/conjunctivaSlice.ts', 'y: int;', 'y: number;')
replace_in_file('store/slices/conjunctivaSlice.ts', 'width: int;', 'width: number;')
replace_in_file('store/slices/conjunctivaSlice.ts', 'height: int;', 'height: number;')

# 2. PredictionResultScreen header props
replace_in_file('screens/PredictionResult/PredictionResultScreen.tsx', 'showBackButton onBackPress', 'onBack')

# 3. Theme imports
theme_files = [
    'components/feature/ExtractionAnimation.tsx',
    'components/feature/FeatureProgress.tsx',
    'components/feature/FeatureSummary.tsx',
    'screens/FeatureExtraction/FeatureExtractionScreen.tsx',
    'screens/FeatureReview/FeatureReviewScreen.tsx'
]
for f in theme_files:
    regex_replace_in_file(f, r"import\s+\{\s*colors\s*\}\s+from\s+'../../theme';", "import { colors } from '../../theme/colors';")

# 4. Text imports
text_files = [
    'components/prediction/ConfidenceCard.tsx',
    'components/prediction/PredictionAnimation.tsx',
    'components/prediction/ProbabilityChart.tsx',
    'components/prediction/RiskIndicator.tsx',
    'screens/Prediction/PredictionProcessingScreen.tsx'
]
for f in text_files:
    # replace import { Text } from '../ui/Text' or similar
    regex_replace_in_file(f, r"import\s+\{\s*Text\s*\}\s+from\s+'\.\./\.\./components/ui/Text';", "import { Text } from 'react-native';")
    regex_replace_in_file(f, r"import\s+\{\s*Text\s*\}\s+from\s+'\.\./ui/Text';", "import { Text } from 'react-native';")

# 5. Button imports
replace_in_file('screens/Prediction/PredictionProcessingScreen.tsx', "import { Button } from '../../components/ui/Button';", "import { AppButton as Button } from '../../components/buttons/AppButton';")
replace_in_file('screens/FeatureReview/FeatureReviewScreen.tsx', "import { Button } from '../../components/common/Button';", "import { AppButton as Button } from '../../components/buttons/AppButton';")

# 6. Colors error -> danger
replace_in_file('components/prediction/ProbabilityChart.tsx', 'colors.error', 'colors.danger')
replace_in_file('components/prediction/RiskIndicator.tsx', 'colors.error', 'colors.danger')
replace_in_file('screens/Prediction/PredictionProcessingScreen.tsx', 'colors.error', 'colors.danger')

# 7. config imports
replace_in_file('screens/ImageQuality/ImageQualityScreen.tsx', "import { API_URL } from '../../config/env';", "import { API_URL } from '../../constants/api';")
replace_in_file('screens/FeatureExtraction/FeatureExtractionScreen.tsx', "import { API_URL } from '../../config/api';", "import { API_URL } from '../../constants/api';")

# 8. hooks/redux
replace_in_file('screens/Prediction/PredictionProcessingScreen.tsx', "from '../../hooks/redux'", "from '../../store/hooks'")

# 9. QualityScoreCircle ThemeProvider
replace_in_file('components/quality/QualityScoreCircle.tsx', "import { useTheme } from '../../theme/ThemeProvider';", "import { useTheme } from 'react-native-paper';")

# 10. ImageState uri -> currentImage?.uri
# We need to find `image.uri` and replace with `image.currentImage?.uri` in specific files, but wait, what is the variable name?
# The error says "Property 'uri' does not exist on type 'ImageState'". So the variable is typed as ImageState.
def fix_image_uri(path):
    if not os.path.exists(path): return
    with open(path, 'r') as f:
        content = f.read()
    # Looking for `.uri` accessed on something of type ImageState.
    # Usually it's `image.uri`.
    content = content.replace('image.uri', 'image.currentImage?.uri')
    with open(path, 'w') as f:
        f.write(content)

fix_image_uri('screens/ConjunctivaDetection/ConjunctivaDetectionScreen.tsx')
fix_image_uri('screens/Preprocessing/PreprocessingScreen.tsx')
fix_image_uri('components/conjunctiva/ROIViewer.tsx')

# 11. Preprocessing NodeJS.Timeout -> any or ReturnType<typeof setTimeout>
regex_replace_in_file('screens/Preprocessing/PreprocessingScreen.tsx', r'NodeJS\.Timeout', 'ReturnType<typeof setTimeout>')

# 12. any types in PredictionProcessingScreen
def fix_any(path):
    if not os.path.exists(path): return
    with open(path, 'r') as f:
        content = f.read()
    content = content.replace('(state) =>', '(state: any) =>')
    content = content.replace('(item, idx)', '(item: any, idx: number)')
    with open(path, 'w') as f:
        f.write(content)

fix_any('screens/Prediction/PredictionProcessingScreen.tsx')

print("Done fixing TS errors")
