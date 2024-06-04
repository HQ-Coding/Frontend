def HQ():
    print("Someone needs a miracle!")

try:
    solveTheProblem()
except Exception as e:
    try:
        tryHarder()
    except Exception as e:
        pass 
    else:
        HQ()