# Creative Router

Use this reference for image, video, design, slides, assets, ads, and visual work.

## First Decision

Classify the output:

- `creative.image`: raster image, illustration, product shot, ad creative, mockup
- `creative.image-edit`: modify an existing image
- `creative.video-html`: HTML/GSAP/HyperFrames video
- `creative.video-react`: Remotion video
- `creative.video-avatar`: HeyGen presenter/avatar video
- `creative.presentation`: Canva or presentation deck
- `creative.stock`: licensed media search
- `creative.biomedical`: scientific figure
- `creative.code-native`: SVG, CSS, canvas, UI component, icon system

## Tool Mapping

- Raster generation or edit: imagegen
- Brand design or editable deck: Canva
- HTML animation/video: HyperFrames
- React video: Remotion
- Avatar/presenter video: HeyGen
- Licensed stock assets: Shutterstock
- Scientific diagrams: BioRender
- Existing vector/code asset: edit repo-native SVG/CSS/code directly

## Hard Gates

Ask before generating when:

- The user asks for a brand asset but gives no brand/style/reference.
- The request includes text in the image but exact copy is missing.
- A video lacks duration or script/message.
- The output could look generic without mood, audience, or format.
- A tool requires account/API access that is not available.
- The user wants native transparency and the default tool path cannot guarantee it.

## Creative Route Preview

```text
Route: creative.<type> | Missing: <inputs> | Tool: <primary> -> <fallback> | Output: <preview|project asset> | Verify: subject/style/text/format
```

## Verification

For generated assets, inspect and report:

- Subject matches request
- Style and audience fit
- Required text is accurate
- Aspect ratio and resolution are usable
- Output path is correct for project-bound assets
- No unwanted watermark, placeholder, or inconsistent visual element

