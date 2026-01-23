## Thing to remember !!!

    Logic lives where decisions are made.
    State lives where truth is decided.
    Services execute effects.
    UI lives where events happen.
    UI asks for changes.
    If the side effect would break if the setter ran twice or later than expected — it does not belong there.

## To rely on:

    You can rely on: (What is guaranteed (and safe to rely on))
    Effects run after render
    State updates trigger re-renders
    Guards run during render
    Props flow top → bottom
    State is consistent within one render
    You cannot rely on:
    Effect A running before effect B
    Parent effect running after child effect
    Effects running exactly once
    Effects running immediately after render
