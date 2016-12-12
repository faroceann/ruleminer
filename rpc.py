import zerorpc
import apriori

class RPC(object):
  def runApriori(self, filePath, minSupport, minConfidence):
    return apriori.doApriori(filePath, minSupport, minConfidence)

s = zerorpc.Server(RPC())
s.bind("tcp://0.0.0.0:4242")
s.run()