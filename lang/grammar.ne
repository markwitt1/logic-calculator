main -> term
operator -> "∧"|"∨"|"⊕"|"⇒"|"⇔"
term ->"¬":? "(" hterm ")" | hterm
hterm ->"¬":? "1"| "¬":? "0"| term operator term